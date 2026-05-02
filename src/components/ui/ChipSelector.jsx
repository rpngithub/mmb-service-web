import { useState, useEffect, useRef } from 'react'

export default function ChipSelector({ options, mode = 'single', max, value = [], onChange, className = '' }) {
  const containerRef = useRef(null)

  const isSelected = (v) => value.includes(v)

  const toggle = (v) => {
    if (mode === 'single') {
      onChange(isSelected(v) ? [] : [v])
      return
    }
    if (isSelected(v)) {
      onChange(value.filter((x) => x !== v))
    } else {
      if (max && value.length >= max) {
        containerRef.current?.classList.add('limit-shake')
        setTimeout(() => containerRef.current?.classList.remove('limit-shake'), 400)
        return
      }
      onChange([...value, v])
    }
  }

  return (
    <div className={`chips-group${mode === 'multi' ? ' multi' : ''} ${className}`} ref={containerRef}>
      {options.map(({ value: v, label }) => (
        <button
          key={v}
          type="button"
          className={`chip${isSelected(v) ? ' selected' : ''}`}
          onClick={() => toggle(v)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
