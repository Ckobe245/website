'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function HeroSection({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      {children}

      <motion.a
        href="#about"
        aria-label="跳转到自我介绍"
        className="absolute bottom-10 flex flex-col items-center gap-2 rounded-lg text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="text-xs tracking-[0.3em]">向下滚动</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  )
}
