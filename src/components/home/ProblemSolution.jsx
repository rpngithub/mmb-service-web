import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function ProblemSolution() {
  const ref = useScrollReveal()

  return (
    <section className="problem-section" id="problem" ref={ref}>
      <div className="container">
        <div className="problem-solution-dual">
          <div className="layout-text reveal-left">
            <div className="ps-header">
              <img src="/images/problem.png" alt="Struggling with social media" className="ps-icon" />
              <div className="section-badge">🚨 THE PROBLEM</div>
            </div>
            <h2 className="section-title">
              Struggling to stay consistent<br />on <span className="text-gradient">social media?</span>
            </h2>
            <ul className="simple-problem-list">
              <li><span className="list-dot"></span>No time to create content regularly?</li>
              <li><span className="list-dot"></span>Reels feel time-consuming?</li>
              <li><span className="list-dot"></span>Your designs look inconsistent?</li>
            </ul>
          </div>

          <div className="layout-text reveal-right stagger-1">
            <div className="ps-header">
              <img src="/images/solution.png" alt="Professional social media solution" className="ps-icon" />
              <div className="section-badge" style={{ color: '#4CAF50', background: 'rgba(76,175,80,0.1)', borderColor: 'rgba(76,175,80,0.2)' }}>
                ✨ THE SOLUTION
              </div>
            </div>
            <h2 className="section-title">
              Your social media,<br /><span className="text-gradient">handled by us</span>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 32 }}>
              We handle your social media creatives, from posts to reels, so you can focus on growing your business.
              Professional designs, consistent branding, delivered monthly.
            </p>
            <Link to="/register" className="btn btn-primary" onClick={() => localStorage.removeItem('activate')}>
              Get 3 Free Designs
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
