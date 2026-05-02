import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import '@/styles/dashboard.css'

const NAV_ITEMS = [
  {
    to: '/dashboard',
    end: true,
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    to: '/dashboard/designs',
    label: 'My Designs',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
      </svg>
    ),
  },
  {
    to: '/dashboard/plans',
    label: 'Plans & Billing',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    to: '/dashboard/profile',
    label: 'Profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    to: '/dashboard/settings',
    label: 'Settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
]

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userName = user?.name || 'User'
  const userInitial = userName.charAt(0).toUpperCase()
  const userPlan = user?.subscription?.plan?.name || 'Free Plan'

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <>
      {/* Mobile Header */}
      <header className="db-mobile-header">
        <button
          className={`db-menu-toggle${sidebarOpen ? ' active' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setSidebarOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
        <Link to="/" className="db-mobile-logo">
          <img src="/images/mmb-logo.svg" alt="MMB" />
        </Link>
        <div className="db-mobile-avatar">{userInitial}</div>
      </header>

      {/* Sidebar Overlay (mobile) */}
      <div
        className={`db-sidebar-overlay${sidebarOpen ? ' active' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`db-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="db-sidebar-top">
          <Link to="/" className="db-sidebar-logo">
            <img src="/images/mmb-logo.svg" alt="MMB" />
          </Link>
        </div>

        <nav className="db-sidebar-nav">
          {NAV_ITEMS.map(({ to, end, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={closeSidebar}
              className={({ isActive }) => `db-nav-item${isActive ? ' active' : ''}`}
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="db-sidebar-bottom">
          <div className="db-user-card">
            <div className="db-user-avatar">{userInitial}</div>
            <div className="db-user-info">
              <span className="db-user-name">{userName}</span>
              <span className="db-user-plan">{userPlan}</span>
            </div>
          </div>
          <button
            onClick={logout}
            style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'none', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.88rem' }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="db-main">
        <Outlet />
      </main>
    </>
  )
}
