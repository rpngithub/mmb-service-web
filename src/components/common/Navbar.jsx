import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleNavLink = (e, hash) => {
    if (isHome) {
      e.preventDefault()
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="container">
          <Link to="/" className="nav-logo">
            <img src={`/images/${scrolled ? 'mmb-logo' : 'mmb-logo-white'}.svg`} alt="MMB" className="nav-logo-img" />
          </Link>
          <div className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
            <a href={isHome ? '#features' : '/#features'} onClick={(e) => handleNavLink(e, '#features')}>Services</a>
            <a href={isHome ? '#pricing' : '/#pricing'} onClick={(e) => handleNavLink(e, '#pricing')}>Pricing</a>
            <a href={isHome ? '#samples' : '/#samples'} onClick={(e) => handleNavLink(e, '#samples')}>Work</a>
            <a href={isHome ? '#testimonials' : '/#testimonials'} onClick={(e) => handleNavLink(e, '#testimonials')}>Reviews</a>
            <a href={isHome ? '#faq' : '/#faq'} onClick={(e) => handleNavLink(e, '#faq')}>FAQ</a>
            {isAuthenticated ? (
              <Link to="/dashboard" className="nav-signin">Dashboard</Link>
            ) : (
              <Link to="/signin" className="nav-signin">Sign In</Link>
            )}
            <Link to="/register" className="btn btn-primary nav-cta" onClick={() => localStorage.removeItem('activate')}>Free Designs</Link>
          </div>
          <div
            className={`hamburger${menuOpen ? ' active' : ''}`}
            id="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      <div
        className={`nav-overlay${menuOpen ? ' active' : ''}`}
        id="navOverlay"
        onClick={() => setMenuOpen(false)}
      />
    </>
  )
}
