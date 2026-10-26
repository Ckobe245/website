'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* 遮罩 */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 内容（移动端为底部抽屉） */}
          <motion.div
            className="relative z-10 w-full max-w-sm rounded-t-3xl border border-line bg-surface p-8 text-center shadow-2xl sm:rounded-3xl"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <button
              onClick={onClose}
              aria-label="关闭"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-line text-foreground-muted transition-colors hover:border-line-strong hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 flex items-center justify-center gap-2">
              <span className="text-xl">📱</span>
              <h3 className="text-lg font-semibold text-foreground">微信公众号</h3>
            </div>

            <QRPlaceholder />

            <p className="mt-6 text-sm text-foreground-muted">
              长按或扫码关注 <span className="font-medium text-foreground">{SITE_NAME}</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** 占位二维码：待替换为真实公众号二维码 */
function QRPlaceholder() {
  return (
    <div className="relative mx-auto flex aspect-square w-52 items-center justify-center overflow-hidden rounded-2xl bg-white">
      {/* 点阵背景 */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
      />
      {/* 三个定位角 */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[
          [0, 0],
          [72, 0],
          [0, 72],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} fill="#000">
            <rect x={x} y={y} width="28" height="28" rx="4" />
            <rect x={x + 8} y={y + 8} width="12" height="12" rx="2" fill="#fff" />
            <rect x={x + 11} y={y + 11} width="6" height="6" fill="#000" />
          </g>
        ))}
      </svg>
      <span className="relative rounded-lg bg-black/85 px-3 py-1.5 text-xs font-medium text-white">
        二维码待替换
      </span>
    </div>
  )
}
