'use client'

import { useState } from 'react'
import { GlowBackground } from '@/components/welcome/GlowBackground'
import { HeroSection } from '@/components/welcome/HeroSection'
import { AnimatedTitle } from '@/components/welcome/AnimatedTitle'
import { IntroSection } from '@/components/welcome/IntroSection'
import { PlatformSection } from '@/components/welcome/PlatformSection'
import { QRCodeModal } from '@/components/welcome/QRCodeModal'
import { Footer } from '@/components/welcome/Footer'
import { BackToTop } from '@/components/welcome/BackToTop'

export default function Page() {
  const [qrOpen, setQrOpen] = useState(false)

  return (
    <>
      <GlowBackground />
      <main className="relative z-10">
        <HeroSection>
          <AnimatedTitle />
        </HeroSection>
        <IntroSection />
        <PlatformSection onOpenQR={() => setQrOpen(true)} />
        <Footer />
      </main>
      <QRCodeModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />
      <BackToTop />
    </>
  )
}
