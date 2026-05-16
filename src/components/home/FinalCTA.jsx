import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useAuth } from '@/contexts/AuthContext'

export default function FinalCTA() {
  const ref = useScrollReveal()
  const { isAuthenticated, subscription, freeTrial } = useAuth()

  return (
    <section className="final-cta-section" id="finalCta" ref={ref}>
      <div className="container">
        <h2 className="section-title reveal">
          Stop worrying about content.<br />
          <span className="text-gradient">Start growing your brand.</span>
        </h2>
        <div className="hero-ctas reveal stagger-1" style={{ marginTop: '36px' }}>
          {!(isAuthenticated && (subscription || freeTrial)) && (
            <Link
              to="/register"
              className="btn btn-primary"
              style={{ fontSize: '1.05rem', padding: '16px 40px' }}
              onClick={() => localStorage.removeItem('activate')}
            >
              🎨 Try 3 FREE Designs
              <span className="arrow">→</span>
            </Link>
          )}
          <a
            href="#pricing"
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  )
}
