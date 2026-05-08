import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '@/contexts/AuthContext'
import { useOtpTimer } from '@/hooks/useOtpTimer'
import { signinMobileStep1, signinMobileStep2 } from '@/api/authService'
import { getProfile } from '@/api/profileService'
import OtpInput from '@/components/ui/OtpInput'
import WhatsAppFAB from '@/components/common/WhatsAppFAB'
import '@/styles/register.css'
import '@/styles/signin.css'
import { set } from 'react-hook-form'

export default function SigninPage() {
  const [step, setStep] = useState(1)
  const [mobile, setMobile] = useState('')
  const [mobileError, setMobileError] = useState('')
  const [txnId, setTxnId] = useState('')
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { remaining, canResend, start: startTimer } = useOtpTimer(30)

  const from = location.state?.from?.pathname || '/dashboard'

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const validateMobile = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMobileError('Enter a valid 10-digit Indian mobile number')
      return false
    }
    setMobileError('')
    return true
  }

  const sendOtp = async () => {
    if (!validateMobile()) return
    setLoading(true)
    try {
      const { data } = await signinMobileStep1({ mobile })
      setTxnId(data.transaction_id)
      setOtp(data.otp) //  For testing purposes, remove in production
      setStep(2)
      startTimer()
    } catch (err) {
      console.error('Failed to send OTP:', err)
      setMobileError(err.response?.data?.error || 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (otp.length !== 6) { setOtpError('Please enter the 6-digit OTP'); return }
    setLoading(true)
    setOtpError('')
    try {
      const { data } = await signinMobileStep2({ mobile, transaction_id: txnId, otp })
      console.log('Login successful:', data);
      login(data.accessToken, null)
      setLoading(false)
      navigate(from, { replace: true })
    } catch (err) {
      console.error('OTP verification failed:', err)
      setOtpError(err.response?.data?.error || 'Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async () => {
    setLoading(true)
    try {
      const { data } = await signinMobileStep1({ mobile })
      setTxnId(data.transaction_id)
      setOtp(data.otp) // For testing purposes, remove in production
      startTimer()
      showToast('OTP sent!')
    } catch {
      showToast('Failed to resend OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-light)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <div className="reg-topbar">
        <Link to="/" className="reg-logo">
          <img src="/images/mmb-logo.svg" alt="MMB" />
        </Link>
      </div>

      <div className="reg-wrapper">
        <div className="reg-card signin-card">

          {/* ===== STEP 1: Mobile Number ===== */}
          {step === 1 && (
            <div className="reg-step active">
              <div className="signin-header">
                <h2>Welcome back 👋</h2>
                <p>Sign in with your mobile number to continue</p>
              </div>

              <div className="reg-form-group">
                <label htmlFor="signinMobile">Mobile Number <span className="req">*</span></label>
                <div className="phone-input">
                  <span className="phone-prefix">+91</span>
                  <input
                    id="signinMobile"
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    autoComplete="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    onKeyDown={(e) => e.key === 'Enter' && sendOtp()}
                  />
                </div>
                {mobileError && <span className="field-error">{mobileError}</span>}
              </div>

              <button className="reg-btn primary" onClick={sendOtp} disabled={loading}>
                {loading ? 'Sending...' : 'Send OTP'}
              </button>

              <p className="reg-micro signin-divider"><span>OR</span></p>

              <div className="signin-new-user">
                <div className="signin-new-icon">🎁</div>
                <div className="signin-new-content">
                  <strong>New here?</strong>
                  <p>Register now to avail <span className="hl">3 FREE designs</span> for your brand!</p>
                </div>
                <Link to="/register" className="reg-btn secondary signin-register-btn">Register Now →</Link>
              </div>
            </div>
          )}

          {/* ===== STEP 2: OTP Verification ===== */}
          {step === 2 && (
            <div className="reg-step active">
              <div className="signin-header">
                <h2>Verify your number 🔐</h2>
                <p>
                  We've sent a 6-digit OTP to <strong>+91 {mobile}</strong>
                  {' '}
                  <a
                    href="#"
                    className="signin-change-link"
                    onClick={(e) => { e.preventDefault(); setStep(1); setOtp('') }}
                  >
                    Change
                  </a>
                </p>
              </div>

              <OtpInput value={otp} onChange={setOtp} error={otpError} />

              <p className="reg-micro">
                Didn't receive?{' '}
                {canResend ? (
                  <a href="#" onClick={(e) => { e.preventDefault(); resendOtp() }}>Resend OTP</a>
                ) : (
                  <span>Resend in {remaining}s</span>
                )}
              </p>

              <button className="reg-btn primary" onClick={verifyOtp} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </button>

              <p className="reg-micro signin-foot">
                New here? <Link to="/register">Register to avail 3 FREE designs →</Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {toast && <div className="signin-toast show">{toast}</div>}

      <WhatsAppFAB />
    </div>
  )
}
