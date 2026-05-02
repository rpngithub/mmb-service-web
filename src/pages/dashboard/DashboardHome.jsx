import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardHome() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="db-page active">
      <div className="db-page-header">
        <div>
          <h1 className="db-page-title">
            Welcome back, <span className="text-gradient">{firstName}</span> 👋
          </h1>
          <p className="db-page-subtitle">Your designs are in progress 🚀</p>
        </div>
      </div>

      <div className="db-cards-row">
        <div className="db-card db-status-card">
          <div className="db-card-icon">📦</div>
          <div className="db-card-body">
            <span className="db-card-label">Free Designs Status</span>
            <span className="db-card-value">
              <span className="db-status-dot in-progress"></span> In Progress
            </span>
            <span className="db-card-meta">⏱ Delivered within 48 hours</span>
          </div>
        </div>

        <div className="db-card db-actions-card">
          <div className="db-card-icon">⚡</div>
          <div className="db-card-body">
            <span className="db-card-label">Quick Actions</span>
            <div className="db-quick-actions">
              <button className="db-action-btn" onClick={() => navigate('/dashboard/designs')}>👁 View Designs</button>
              <button className="db-action-btn" onClick={() => navigate('/dashboard/designs')}>⬇ Download</button>
              <button className="db-action-btn primary" onClick={() => navigate('/dashboard/plans')}>🚀 Upgrade Plan</button>
            </div>
          </div>
        </div>

        <div className="db-card db-plan-card">
          <div className="db-card-icon">💎</div>
          <div className="db-card-body">
            <span className="db-card-label">Current Plan</span>
            <span className="db-card-value">Free</span>
            <button className="db-action-btn primary" onClick={() => navigate('/dashboard/plans')}>
              Upgrade Now →
            </button>
          </div>
        </div>
      </div>

      <div className="db-timeline-card db-card">
        <h3>📅 Activity Timeline</h3>
        <div className="db-timeline">
          <div className="db-timeline-item">
            <div className="db-timeline-dot active"></div>
            <div className="db-timeline-content">
              <strong>Registration completed</strong>
              <span>You signed up for 3 free designs</span>
            </div>
            <span className="db-timeline-time">Today</span>
          </div>
          <div className="db-timeline-item">
            <div className="db-timeline-dot"></div>
            <div className="db-timeline-content">
              <strong>Designs in progress</strong>
              <span>Our team is working on your creatives</span>
            </div>
            <span className="db-timeline-time">In progress</span>
          </div>
          <div className="db-timeline-item">
            <div className="db-timeline-dot"></div>
            <div className="db-timeline-content">
              <strong>Delivery</strong>
              <span>Your designs will be ready soon</span>
            </div>
            <span className="db-timeline-time">Within 48h</span>
          </div>
        </div>
      </div>
    </div>
  )
}
