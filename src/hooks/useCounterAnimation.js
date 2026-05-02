import { useEffect, useRef } from 'react'

export function useCounterAnimation(target, duration = 2000) {
  const elRef = useRef(null)

  useEffect(() => {
    const el = elRef.current
    if (!el || !target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const startTime = performance.now()

        function update(now) {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          el.textContent = Math.round(eased * target).toLocaleString()
          if (progress < 1) requestAnimationFrame(update)
        }

        requestAnimationFrame(update)
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return elRef
}
