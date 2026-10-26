import { useEffect, useRef, useState } from 'react'

/**
 * 元素进入视口后触发一次，返回 ref 与是否进入视口。
 * 用于驱动「滚动到区域才开始播放」的动画。
 */
export function useScrollTrigger<T extends HTMLElement>(threshold = 0.3, rootMargin = '0px') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, inView }
}
