import { useRef } from 'react'

export default function OtpInput({ value, onChange, error }) {
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6)
    onChange(val)
    if (val.length === 6) inputRef.current?.blur()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(pasted)
  }

  return (
    <div className="reg-form-group">
      <label>Enter OTP</label>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        placeholder="Enter 6-digit OTP"
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}
