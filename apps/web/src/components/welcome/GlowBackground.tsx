'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface GlowBackgroundProps {
  colorWarm?: string
  colorCool?: string
}

type Rgb = [number, number, number]

interface Blob {
  x: number
  y: number
  radius: number
  driftX: number
  driftY: number
  phase: number
  speed: number
  color: Rgb
}

interface Particle {
  x: number
  y: number
  radius: number
  speed: number
  drift: number
  phase: number
  color: Rgb
}

function hexToRgb(hex: string): Rgb {
  const value = Number.parseInt(hex.replace('#', ''), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

/**
 * 全屏 Canvas 流动光晕背景：暖金 + 冷色光晕缓慢流动，
 * 附带少量上浮粒子与鼠标附近的柔和光晕，暗色底上以 additive 混合叠加。
 */
export function GlowBackground({ colorWarm = '#d4a574', colorCool = '#5eead4' }: GlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId = 0
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const warm = hexToRgb(colorWarm)
    const cool = hexToRgb(colorCool)

    const mouse = { x: -9999, y: -9999, active: false }

    let blobs: Blob[] = []
    let particles: Particle[] = []

    const seed = () => {
      const blobCount = isMobile ? 4 : 7
      blobs = Array.from({ length: blobCount }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * width * 0.22 + width * 0.16,
        driftX: (Math.random() - 0.5) * 0.4,
        driftY: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.00012 + Math.random() * 0.00012,
        color: i % 2 === 0 ? warm : cool,
      }))

      const particleCount = isMobile ? 24 : 48
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.4,
        speed: 0.08 + Math.random() * 0.2,
        drift: (Math.random() - 0.5) * 0.2,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? warm : cool,
      }))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      // 光晕
      for (const blob of blobs) {
        const t = time * blob.speed + blob.phase
        const parallaxX = mouse.active ? (mouse.x - width / 2) * 0.04 : 0
        const parallaxY = mouse.active ? (mouse.y - height / 2) * 0.04 : 0
        const x = blob.x + Math.sin(t) * blob.driftX * width * 0.3 + parallaxX
        const y = blob.y + Math.cos(t * 0.9) * blob.driftY * height * 0.3 + parallaxY
        const [r, g, b] = blob.color
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.radius)
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.14)`)
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.05)`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // 上浮粒子
      for (const particle of particles) {
        const t = time * 0.001 * particle.speed + particle.phase
        const rawY = particle.y - time * 0.02 * particle.speed
        const y = ((rawY % height) + height) % height
        const x = particle.x + Math.sin(t) * particle.drift * 20
        const [r, g, b] = particle.color
        const alpha = 0.18 + Math.sin(time * 0.002 + particle.phase) * 0.12
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, alpha).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // 鼠标附近柔和光晕
      if (mouse.active) {
        const [r, g, b] = warm
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180)
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.1)`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      rafId = requestAnimationFrame(draw)
    }

    const onPointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.active = true
    }

    const onPointerLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    resize()

    if (prefersReducedMotion) {
      draw(0)
      cancelAnimationFrame(rafId)
    } else {
      rafId = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [colorWarm, colorCool, isMobile, prefersReducedMotion])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* 暗角遮罩，让前景文字更聚焦 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(8, 8, 12, 0.72) 100%)',
        }}
      />
    </div>
  )
}
