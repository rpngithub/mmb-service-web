import { useState, useEffect, useRef } from 'react'

export function useOtpTimer(seconds = 30) {
  const [remaining, setRemaining] = useState(0)
  const interval = useRef(null)

  const start = () => setRemaining(seconds)

  useEffect(() => {
    if (remaining <= 0) {
      clearInterval(interval.current)
      return
    }
    interval.current = setInterval(() => {
      setRemaining((r) => r - 1)
    }, 1000)
    return () => clearInterval(interval.current)
  }, [remaining])

  return { remaining, canResend: remaining === 0, start }
}
