import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useOtpTimer } from '@/hooks/useOtpTimer'
import { updateMobileStep1, updateMobileStep2 } from '@/api/profileService'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [newMobile, setNewMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [txnId, setTxnId] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')
  const { remaining, canResend, start: startTimer } = useOtpTimer(30)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const sendMobileOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(newMobile)) { showToast('Enter a valid 10-digit mobile number'); return }
    setLoading(true)
    try {
      const { data } = await updateMobileStep1({ mobile: newMobile })
      setTxnId(data.transaction_id)
      setOtpSent(true)
      startTimer()
      showToast('OTP sent to your new number')
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const verifyMobileOtp = async () => {
    if (otp.length !== 6) { showToast('Enter the 6-digit OTP'); return }
    setLoading(true)
    try {
      await updateMobileStep2({ mobile: newMobile, transaction_id: txnId, otp })
      showToast('✅ Mobile number updated successfully!')
      setOtpSent(false)
      setNewMobile('')
      setOtp('')
    } catch (err) {
      showToast(err.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="db-page active">
      <div className="db-page-header">
        <div>
          <h1 className="db-page-title"><span className="text-gradient">Settings</span></h1>
          <p className="db-page-subtitle">Manage your account preferences</p>
        </div>
      </div>

      {/* Change Mobile */}
      <div className="db-settings-card db-card">
        <div className="db-settings-header">
          <span className="db-settings-icon">🔐</span>
          <div>
            <h3>Change Mobile Number</h3>
            <p>Current: +91 {user?.mobile || 'N/A'}</p>
          </div>
        </div>
        <div className="db-settings-body">
          <div className="db-form-group">
            <label htmlFor="newMobile">New Mobile Number</label>
            <div className="db-phone-input">
              <span className="db-phone-prefix">+91</span>
              <input
                id="newMobile"
                type="tel"
                placeholder="Enter new number"
                maxLength={10}
                value={newMobile}
                onChange={(e) => setNewMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                disabled={otpSent}
              />
            </div>
          </div>
          {otpSent && (
            <div className="db-form-group">
              <label htmlFor="settingsOtp">Enter OTP</label>
              <input
                id="settingsOtp"
                type="text"
                placeholder="6-digit OTP"
                maxLength={6}
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                {canResend ? (
                  <a href="#" onClick={(e) => { e.preventDefault(); sendMobileOtp() }}>Resend OTP</a>
                ) : (
                  `Resend in ${remaining}s`
                )}
              </p>
            </div>
          )}
          <button
            className="db-save-btn"
            onClick={otpSent ? verifyMobileOtp : sendMobileOtp}
            disabled={loading}
          >
            {loading ? 'Please wait...' : otpSent ? 'Verify & Update' : 'Send OTP'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="db-settings-card db-card">
        <div className="db-settings-header">
          <span className="db-settings-icon">🔔</span>
          <div>
            <h3>Notifications</h3>
            <p>Choose how you want to receive updates</p>
          </div>
        </div>
        <div className="db-settings-body">
          <div className="db-toggle-row">
            <div>
              <strong>WhatsApp Notifications</strong>
              <p>Receive design updates on WhatsApp</p>
            </div>
            <label className="db-toggle">
              <input type="checkbox" defaultChecked />
              <span className="db-toggle-slider"></span>
            </label>
          </div>
          <div className="db-toggle-row">
            <div>
              <strong>Email Notifications</strong>
              <p>Receive updates via email</p>
            </div>
            <label className="db-toggle">
              <input type="checkbox" defaultChecked />
              <span className="db-toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="db-settings-card db-card">
        <div className="db-settings-header">
          <span className="db-settings-icon">🚪</span>
          <div>
            <h3>Logout</h3>
            <p>Sign out of your account</p>
          </div>
        </div>
        <div className="db-settings-body">
          <button className="db-logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>

      {toast && (
        <div className="db-toast-container">
          <div className="db-toast">{toast}</div>
        </div>
      )}
    </div>
  )
}
