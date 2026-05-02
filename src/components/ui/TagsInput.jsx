import { useState, useRef } from 'react'

export default function TagsInput({ value = [], onChange, placeholder = 'Press Enter or comma to add' }) {
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  const addTag = (raw) => {
    const tag = raw.trim()
    if (tag && !value.includes(tag)) {
      onChange([...value, tag])
    }
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const handleChange = (e) => {
    const val = e.target.value
    if (val.endsWith(',')) {
      addTag(val.slice(0, -1))
    } else {
      setInput(val)
    }
  }

  const removeTag = (tag) => onChange(value.filter((t) => t !== tag))

  return (
    <div
      className="tags-input-container"
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag) => (
        <span key={tag} className="tag-item">
          {tag}
          <button type="button" className="tag-remove" onClick={() => removeTag(tag)}>×</button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ''}
      />
    </div>
  )
}
