import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCounterAnimation } from '@/hooks/useCounterAnimation'
import { useAuth } from '@/contexts/AuthContext'

const heroIcons = [
  { cls: 'w-fb',    src: '/images/hero-icons/fb.png',    alt: 'FB',    speed: 0.2   },
  { cls: 'w-ig',    src: '/images/hero-icons/ig.png',    alt: 'IG',    speed: -0.3  },
  { cls: 'w-like',  src: '/images/hero-icons/like.png',  alt: 'Like',  speed: 0.15  },
  { cls: 'w-love',  src: '/images/hero-icons/love.png',  alt: 'Love',  speed: -0.25 },
  { cls: 'w-pin',   src: '/images/hero-icons/pin.png',   alt: 'Pin',   speed: 0.3   },
  { cls: 'w-share', src: '/images/hero-icons/share.png', alt: 'Share', speed: -0.2  },
  { cls: 'w-tel',   src: '/images/hero-icons/tel.png',   alt: 'Tel',   speed: 0.4   },
  { cls: 'w-tt',    src: '/images/hero-icons/tt.png',    alt: 'TT',    speed: -0.15 },
  { cls: 'w-wa',    src: '/images/hero-icons/wa.png',    alt: 'WA',    speed: 0.25  },
  { cls: 'w-x',     src: '/images/hero-icons/x.png',     alt: 'X',     speed: -0.1  },
  { cls: 'w-yt',    src: '/images/hero-icons/yt.png',    alt: 'YT',    speed: 0.35  },
]

export default function HeroSection() {
  const { isAuthenticated, subscription, freeTrial } = useAuth()
  const iconsRef = useRef(null)
  const count50 = useCounterAnimation(50)
  const count1200 = useCounterAnimation(1200)
  const count48 = useCounterAnimation(48)

  useEffect(() => {
    const container = iconsRef.current
    if (!container) return

    const onMouseMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy

      container.querySelectorAll('.hero-icon-wrapper').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || 0)
        el.style.transform = `translate(${dx * speed * 40}px, ${dy * speed * 40}px)`
      })
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-image"></div>
      <div className="hero-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="hero-3d-icons" id="hero3dIcons" ref={iconsRef}>
        {heroIcons.map(({ cls, src, alt, speed }) => (
          <div key={cls} className={`hero-icon-wrapper ${cls}`} data-speed={speed}>
            <img src={src} alt={alt} className="hero-icon" />
          </div>
        ))}
      </div>

      <div className="container">
        <div className="hero-badge">
          <span className="pulse-dot"></span>
          Social Media, Simplified
        </div>
        <h1 className="hero-title">
          Better content. Better design.<br />
          <span className="highlight">Better results.</span>
        </h1>
        <p className="hero-subtitle">
          Monthly social media creatives and reels designed for your brand—delivered ready to post, without the stress.
        </p>
        <div className="hero-ctas">
          {!(isAuthenticated && (subscription || freeTrial)) && (
            <Link to="/register" className="btn btn-primary" onClick={() => localStorage.removeItem('activate')}>
              🎨 Try 3 FREE Designs
              <span className="arrow">→</span>
            </Link>
          )}
          <a href="#pricing" className="btn btn-secondary" onClick={(e) => {
            e.preventDefault()
            document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })
          }}>View Plans</a>
        </div>
        <div className="hero-trust">
          <div className="check-icon">✓</div>
          <span>Helping brands stay consistent, visible, and professional on social media.</span>
        </div>

        <div className="stats-bar">
          <div className="stat-item reveal stagger-1">
            <div className="stat-number"><span className="text-gradient" ref={count50}>0</span>+</div>
            <div className="stat-label">Brands Served</div>
          </div>
          <div className="stat-item reveal stagger-2">
            <div className="stat-number"><span className="text-gradient" ref={count1200}>0</span>+</div>
            <div className="stat-label">Designs Delivered</div>
          </div>
          <div className="stat-item reveal stagger-3">
            <div className="stat-number"><span className="text-gradient" ref={count48}>0</span>h</div>
            <div className="stat-label">Avg. Delivery Time</div>
          </div>
        </div>
      </div>
    </section>
  )
}
