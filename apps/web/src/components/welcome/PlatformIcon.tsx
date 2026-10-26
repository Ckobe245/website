'use client'

import { motion } from 'framer-motion'
import { BookOpen, MessageCircle, Music, Tv, type LucideIcon } from 'lucide-react'
import type { Platform } from '@/types'

const iconMap: Record<Platform['icon'], LucideIcon> = {
  'wechat-video': MessageCircle,
  douyin: Music,
  bilibili: Tv,
  xiaohongshu: BookOpen,
}

const colorMap = {
  warm: {
    text: 'text-accent-warm',
    glow: 'group-hover:shadow-[0_0_24px_-4px_rgba(212,165,116,0.5)]',
    border: 'hover:border-accent-warm/40',
    pill: 'bg-accent-warm/10 text-accent-warm',
  },
  cool: {
    text: 'text-accent-cool',
    glow: 'group-hover:shadow-[0_0_24px_-4px_rgba(94,234,212,0.5)]',
    border: 'hover:border-accent-cool/40',
    pill: 'bg-accent-cool/10 text-accent-cool',
  },
} as const

interface PlatformIconProps {
  platform: Platform
  index: number
}

export function PlatformIcon({ platform, index }: PlatformIconProps) {
  const Icon = iconMap[platform.icon]
  const c = colorMap[platform.color]

  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex min-h-[9.5rem] flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-surface/50 p-5 backdrop-blur-md transition-colors ${c.border}`}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 260, damping: 22 }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface-raised/60 transition-transform duration-200 group-hover:scale-110 ${c.glow}`}
      >
        <Icon className={`h-6 w-6 ${c.text}`} strokeWidth={1.8} />
      </span>
      <span className="text-base font-semibold text-foreground">{platform.name}</span>
      <span className={`rounded-full px-2.5 py-0.5 text-xs ${c.pill}`}>{platform.label}</span>
    </motion.a>
  )
}
