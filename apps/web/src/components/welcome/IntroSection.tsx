'use client'

import { useScrollTrigger } from '@/hooks/useScrollTrigger'
import { TypewriterText } from './TypewriterText'
import { INTRO_LINES } from '@/lib/constants'

export function IntroSection() {
  const { ref, inView } = useScrollTrigger<HTMLElement>(0.2)

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center px-6 py-24"
    >
      <p className="mb-6 text-sm tracking-[0.3em] text-foreground-muted">关于我</p>
      <TypewriterText lines={INTRO_LINES} enabled={inView} />
    </section>
  )
}
