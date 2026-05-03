import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { getUserDesigns } from '@/api/designService'

const FREE_SAMPLES = [
  { id: 1, name: 'Post 1', src: '/images/sample-1.png' },
  { id: 2, name: 'Post 2', src: '/images/sample-2.png' },
  { id: 3, name: 'Reel 1', src: '/images/sample-3.png' },
]

export default function MyDesigns() {
  const { user, subscription, freeTrial } = useAuth()
  const [tab, setTab] = useState('free')
  const [designs, setDesigns] = useState([])
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getUserDesigns()
      .then(({ data }) => setDesigns(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  return (
    <div className="db-page active">
      <div className="db-page-header">
        <div>
          <h1 className="db-page-title">My <span className="text-gradient">Designs</span></h1>
          <p className="db-page-subtitle">View and download your social media creatives</p>
        </div>
      </div>

      { subscription && (
      <div id="subscription-designs">
        <h2 className="db-section-heading">This month Designs</h2>
        {designs.filter(d => d.subscription_id).length > 0 ? (
        <div className="db-designs-grid">
            {designs.filter(d => d.subscription_id).map((d) => (
              <div key={d.id} className="db-design-card">
                <div className="db-design-thumb">
                  <img src={d.src} alt={d.name} />
                  <div className="db-design-overlay">
                    <button className="db-overlay-btn" onClick={() => setPreview(d)} aria-label="Preview">👁</button>
                    <a className="db-overlay-btn download" href={d.src} download aria-label="Download">⬇</a>
                  </div>
                </div>
                <div className="db-design-info">
                  <span className="db-design-name">{d.name}</span>
                  <span className="db-design-status ready">Ready</span>
                </div>
              </div>
            ))}

          </div>
          ) : (
            <div className="db-empty-state">
              <div className="db-empty-icon">🎨</div>
              <h3>We are working on it!</h3>
              <p>Please check back later for new designs.</p>
            </div>
          )}
      </div>
      )}

      {freeTrial && (
      <React.Fragment>
      <div className="db-free-banner">
        <div className="db-free-banner-content">
          <span className="db-free-banner-icon">🎉</span>
          <div>
            <strong>{ designs.filter(d => !d.subscription_id).length > 0 ? `Your ${designs.filter(d => !d.subscription_id).length} FREE designs are ready!` : 'We are working on it!' }</strong>
            <p>Download them below and see the quality for yourself.</p>
          </div>
        </div>
        <button className="db-action-btn primary" onClick={() => setTab('free')}>View Designs ↓</button>
      </div>

      <div className="db-tabs">
        <button className={`db-tab${tab === 'free' ? ' active' : ''}`} onClick={() => setTab('free')}>
          Free Designs
        </button>
        <button className={`db-tab${tab === 'monthly' ? ' active' : ''}`} onClick={() => setTab('monthly')}>
          Monthly Designs
        </button>
      </div>
      

      {tab === 'free' && (
        <React.Fragment>
          <div className="db-designs-grid">
            {designs.filter(d => !d.subscription_id).map((d) => (
              <div key={d.id} className="db-design-card">
                <div className="db-design-thumb">
                  <img src={d.src} alt={d.name} />
                  <div className="db-design-overlay">
                    <button className="db-overlay-btn" onClick={() => setPreview(d)} aria-label="Preview">👁</button>
                    <a className="db-overlay-btn download" href={d.src} download aria-label="Download">⬇</a>
                  </div>
                </div>
                <div className="db-design-info">
                  <span className="db-design-name">{d.name}</span>
                  <span className="db-design-status ready">Ready</span>
                </div>
              </div>
            ))}
          </div>

          <div className="db-convert-banner">
            <div className="db-convert-content">
              <h3>Like these designs? 🎨</h3>
              <p>Upgrade to get fresh content delivered every month for your brand.</p>
            </div>
            <button className="db-action-btn primary" onClick={() => navigate('/dashboard/plans')}>
              Upgrade Now →
            </button>
          </div>
        </React.Fragment>
      )}

      {tab === 'monthly' && (
        designs.length > 0 ? (
          <div className="db-designs-grid">
            {designs.map((d) => (
              <div key={d.id} className="db-design-card">
                <div className="db-design-thumb">
                  <img src={d.file_url || '/images/sample-1.png'} alt={d.title || 'Design'} />
                  <div className="db-design-overlay">
                    <button className="db-overlay-btn" onClick={() => setPreview({ src: d.file_url, name: d.title })} aria-label="Preview">👁</button>
                    <a className="db-overlay-btn download" href={d.file_url} download aria-label="Download">⬇</a>
                  </div>
                </div>
                <div className="db-design-info">
                  <span className="db-design-name">{d.title || 'Design'}</span>
                  <span className="db-design-status ready">Ready</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="db-empty-state">
            <div className="db-empty-icon">🎨</div>
            <h3>No monthly designs yet</h3>
            <p>Upgrade to a paid plan to receive professional social media content every month.</p>
            <button className="db-action-btn primary" onClick={() => navigate('/dashboard/plans')}>
              View Plans →
            </button>
          </div>
        )
      )}
      </React.Fragment>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="db-modal-overlay" style={{ display: 'flex' }} onClick={() => setPreview(null)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()}>
            <button className="db-modal-close" onClick={() => setPreview(null)}>✕</button>
            <img src={preview.src} alt={preview.name} className="db-modal-img" />
            <div className="db-modal-actions">
              <a className="db-action-btn primary download" href={preview.src} download>⬇ Download</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
