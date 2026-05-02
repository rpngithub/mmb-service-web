import { createContext, useContext, useState, useEffect } from 'react'
import { getProfile } from '@/api/profileService'
import { logout as apiLogout } from '@/api/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('mmb_access_token')
    if (token) {
      getProfile()
        .then(({ data }) => setUser(data))
        .catch(() => localStorage.removeItem('mmb_access_token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = (token, userData) => {
    localStorage.setItem('mmb_access_token', token)
    setUser(userData)
  }

  const logout = async () => {
    try { await apiLogout() } catch (_) {}
    localStorage.removeItem('mmb_access_token')
    setUser(null)
  }

  const isAuthenticated = Boolean(user)

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
