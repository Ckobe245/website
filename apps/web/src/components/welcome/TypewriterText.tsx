'use client'

import { useTypewriter } from '@/hooks/useTypewriter'

interface TypewriterTextProps {
  lines: string[]
  enabled?: boolean
  speed?: number
}

export function TypewriterText({ lines, enabled = true, speed }: TypewriterTextProps) {
  const { text, done } = useTypewriter(lines, { enabled, speed })
  const renderedLines = text.split('\n')

  return (
    <div className="space-y-3">
      {renderedLines.map((line, index) => {
        const isLast = index === renderedLines.length - 1
        return (
          <p
            key={index}
            className="text-2xl leading-relaxed text-foreground sm:text-3xl md:text-4xl"
          >
            {line}
            {isLast && (
              <span
                className={`ml-1 inline-block h-[1em] w-[3px] translate-y-[0.2em] bg-accent-warm ${
                  done ? '' : 'cursor-blink'
                }`}
              />
            )}
          </p>
        )
      })}
    </div>
  )
}
