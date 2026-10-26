'use client'

import { motion, type Variants } from 'framer-motion'
import { HERO_SUBTITLE, SITE_NAME } from '@/lib/constants'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

/** 首屏标题渐入 + 副标题流光 */
export function AnimatedTitle() {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* 头像 / Logo 占位（后续替换为真实头像） */}
      <motion.div variants={item} className="relative mb-8 h-24 w-24">
        <div
          className="absolute inset-0 rounded-full opacity-40 blur-md"
          style={{ background: 'conic-gradient(from 180deg, #d4a574, #5eead4, #d4a574)' }}
        />
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-line-strong bg-surface/70 backdrop-blur-md">
          <span className="bg-gradient-to-br from-accent-warm to-accent-cool bg-clip-text text-4xl font-bold text-transparent">
            c
          </span>
        </div>
      </motion.div>

      <motion.h1
        variants={item}
        className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
      >
        {SITE_NAME}
      </motion.h1>

      <motion.div variants={item} className="mt-6 flex items-center gap-3 text-accent-warm">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent-warm/60" />
        <span className="text-sm">✦</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent-warm/60" />
      </motion.div>

      <motion.p
        variants={item}
        className="text-gradient-flow mt-6 text-xl font-medium tracking-wide sm:text-2xl"
      >
        {HERO_SUBTITLE}
      </motion.p>
    </motion.div>
  )
}
