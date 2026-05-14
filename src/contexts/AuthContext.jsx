import { createContext, useContext, useState, useEffect } from 'react'
import { getProfile } from '@/api/profileService'
import { logout as apiLogout } from '@/api/authService'
import { get, set } from 'react-hook-form';

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [business, setBusiness] = useState(null);
  const [freeTrial, setFreeTrial] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('mmb_access_token')
    if (token) {
      getProfile()
        .then(({ data }) => {
          console.log('User profile loaded:', data)
          setUser(data.user)
          setSubscription(data.subscription)
          setBusiness(data.userBusiness)
          setFreeTrial(data.freeTrial)
        })
        .catch(() => localStorage.removeItem('mmb_access_token'))
        .finally(() => setLoading(false))
      // getUserProfile();
    } else {
      setLoading(false)
    }
  }, [])

  async function getUserProfile() {
    try {
      setLoading(true)
      const { data } = await getProfile()
      // setUser(data.user)
      // setSubscription(data.subscription)
      // setBusiness(data.userBusiness)
      setUserProfile(data);
    } catch (err) {
      console.error('Failed to fetch user profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const setUserProfile = (userData) => {
    userData.user ? setUser(userData.user) : setUser(user)
    userData.subscription ? setSubscription(userData.subscription) : setSubscription(subscription)
    userData.userBusiness ? setBusiness(userData.userBusiness) : setBusiness(business)
  }
  
  const login = (token, userData = null) => {
    localStorage.setItem('mmb_access_token', token)
    if(userData) {
      setUser(userData.user)
      setSubscription(userData.subscription)
      setBusiness(userData.userBusiness)
      setLoading(false);
    } else {
      getUserProfile()
    }
  }

  const logout = async () => {
    try { await apiLogout() } catch (_) {}
    localStorage.removeItem('mmb_access_token')
    setUser(null)
    setSubscription(null)
    setBusiness(null)
    setFreeTrial(null)
  }

  const isAuthenticated = Boolean(user)
  console.log('AuthContext state:', { user, subscription, business, freeTrial, loading, isAuthenticated })

  return (
    <AuthContext.Provider value={{ user, subscription, business, freeTrial, loading, isAuthenticated, login, logout, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
