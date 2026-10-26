'use client'

import { motion } from 'framer-motion'
import { QrCode, Smartphone } from 'lucide-react'

interface WechatQRButtonProps {
  onClick: () => void
}

export function WechatQRButton({ onClick }: WechatQRButtonProps) {
  return (
    <motion.div
      className="mt-14 flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <p className="text-sm text-foreground-muted">微信公众号 · 扫码关注</p>
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="group flex items-center gap-3 rounded-full border border-line bg-surface/60 px-7 py-3.5 backdrop-blur-md transition-colors hover:border-accent-cool/40"
      >
        <Smartphone className="h-5 w-5 text-accent-cool transition-transform group-hover:scale-110" />
        <span className="font-medium text-foreground">扫码关注 小c</span>
        <QrCode className="h-5 w-5 text-foreground-muted" />
      </motion.button>
    </motion.div>
  )
}
