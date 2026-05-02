import { useRef } from 'react'

const STYLES = [
  { value: 'Minimal', src: '/images/minimal.webp', alt: 'Minimal Style' },
  { value: 'Bold', src: '/images/bold.webp', alt: 'Bold Style' },
  { value: 'Premium', src: '/images/premium.webp', alt: 'Premium Style' },
  { value: 'Modern', src: '/images/morden.webp', alt: 'Modern Style' },
  { value: 'Corporate', src: '/images/corporate.webp', alt: 'Corporate Style' },
]

const MAX = 2

export default function StyleCardSelector({ value = [], onChange }) {
  const containerRef = useRef(null)

  const isSelected = (v) => value.includes(v)

  const toggle = (v) => {
    if (isSelected(v)) {
      onChange(value.filter((x) => x !== v))
    } else {
      if (value.length >= MAX) {
        containerRef.current?.classList.add('limit-shake')
        setTimeout(() => containerRef.current?.classList.remove('limit-shake'), 400)
        return
      }
      onChange([...value, v])
    }
  }

  return (
    <div className="style-cards" ref={containerRef}>
      {STYLES.map(({ value: v, src, alt }) => (
        <button
          key={v}
          type="button"
          className={`style-card${isSelected(v) ? ' selected' : ''}`}
          onClick={() => toggle(v)}
        >
          <img src={src} className="style-preview" alt={alt} />
          <span>{v}</span>
        </button>
      ))}
    </div>
  )
}
