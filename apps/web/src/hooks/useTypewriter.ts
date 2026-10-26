import { useEffect, useMemo, useState } from 'react'

interface UseTypewriterOptions {
  /** 每个字符间隔（ms） */
  speed?: number
  /** 开始前的延迟（ms） */
  startDelay?: number
  /** 是否开始打字（用于滚动触发） */
  enabled?: boolean
}

/**
 * 打字机效果：逐字揭示多行文本。
 * 返回已揭示的整段文本（以 \n 分隔各段），由组件自行拆分渲染。
 */
export function useTypewriter(lines: string[], options: UseTypewriterOptions = {}) {
  const { speed = 48, startDelay = 400, enabled = true } = options
  const fullText = useMemo(() => lines.join('\n'), [lines])
  const [count, setCount] = useState(0)

  const done = count >= fullText.length

  useEffect(() => {
    if (!enabled) return

    let interval: ReturnType<typeof setInterval> | undefined
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= fullText.length) {
            if (interval) clearInterval(interval)
            return c
          }
          return c + 1
        })
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timer)
      if (interval) clearInterval(interval)
    }
  }, [enabled, fullText, speed, startDelay])

  return { text: fullText.slice(0, count), done }
}
