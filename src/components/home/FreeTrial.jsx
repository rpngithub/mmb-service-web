import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useAuth } from '@/contexts/AuthContext'

export default function FreeTrial() {
  const ref = useScrollReveal()
  const { isAuthenticated, subscription, freeTrial } = useAuth()

  return (
    <section className="trial-section" id="trial" ref={ref}>
      <div className="container">
        <div className="trial-card reveal-scale">
          <div className="section-badge">🎁 FREE TRIAL</div>
          <h2 className="section-title">
            Try before you <span className="text-gradient">commit</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 12px' }}>
            Get 3 FREE social media designs customized for your brand.<br />
            <strong style={{ color: 'var(--text-white)' }}>No payment. No commitment.</strong>
          </p>
          <div className="trial-urgency">Delivered within 48 hours</div>
          <br />
          {!(isAuthenticated && (subscription || freeTrial)) && (
            <Link
              to="/register"
              className="btn btn-primary"
              style={{ fontSize: '1.05rem', padding: '16px 40px' }}
              onClick={() => localStorage.removeItem('activate')}
            >
              🎨 Get My Free Designs
              <span className="arrow">→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
