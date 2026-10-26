'use client'

import { motion } from 'framer-motion'
import { platforms } from '@/lib/platforms'
import { PlatformIcon } from './PlatformIcon'
import { WechatQRButton } from './WechatQRButton'

interface PlatformSectionProps {
  onOpenQR: () => void
}

export function PlatformSection({ onOpenQR }: PlatformSectionProps) {
  return (
    <section className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 py-24">
      <motion.h2
        className="mb-4 text-3xl font-bold text-foreground sm:text-4xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        🔗 找到我
      </motion.h2>

      <motion.p
        className="mb-12 max-w-md text-center text-foreground-muted"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        在各个平台都能找到我，欢迎来玩 👋
      </motion.p>

      <div className="grid w-full grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {platforms.map((platform, index) => (
          <PlatformIcon key={platform.id} platform={platform} index={index} />
        ))}
      </div>

      <WechatQRButton onClick={onOpenQR} />
    </section>
  )
}
