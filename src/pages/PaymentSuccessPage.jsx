import { Link } from 'react-router-dom'
import WhatsAppFAB from '@/components/common/WhatsAppFAB'
import '@/styles/register.css'

const waNumber = import.meta.env.VITE_WA_NUMBER || '916380271857'
const waLink = `https://wa.me/${waNumber}?text=Hi%2C%20I%27ve%20registered%20on%20MMB%20and%20I%27m%20excited%20to%20receive%20my%20free%20designs!`

export default function PaymentSuccessPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-light)', display: 'flex', flexDirection: 'column' }}>
      <div className="reg-topbar">
        <Link to="/" className="reg-logo">
          <img src="/images/mmb-logo.svg" alt="MMB" />
        </Link>
      </div>

      <div className="reg-wrapper">
        <div className="reg-card">
          <div className="reg-step active">
            <div className="success-screen">
              <div className="success-icon">🎉</div>
              <h2>You're all set!</h2>
              <p>
                We're working on your <strong>designs</strong>.<br />
                You'll receive them within <strong>48 hours</strong>.
              </p>
              <a href={waLink} target="_blank" rel="noopener" className="reg-btn primary whatsapp-btn">
                💬 Continue on WhatsApp
              </a>
              <p className="reg-micro" style={{ marginTop: '12px' }}>
                Need immediate help? Message us directly on WhatsApp.
              </p>
              <Link to="/" className="reg-btn secondary" style={{ marginTop: '12px' }}>
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppFAB />
    </div>
  )
}
