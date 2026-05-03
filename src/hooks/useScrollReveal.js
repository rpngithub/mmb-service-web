import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}, deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const elements = el.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px', ...options }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, deps) // 👈 important

  return ref
}
