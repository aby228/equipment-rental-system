import { useState, useEffect } from 'react'

interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
}

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkAuthStatus = () => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null
      if (stored) {
        const parsed: UserData = JSON.parse(stored)
        setUser(parsed)
        setIsLoggedIn(true)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
    } catch {
      setUser(null)
      setIsLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }

  const login = (userData: UserData) => {
    setUser(userData)
    setIsLoggedIn(true)
    try {
      localStorage.setItem('user', JSON.stringify(userData))
    } catch {}
    window.dispatchEvent(new CustomEvent('userLogin'))
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    try {
      localStorage.removeItem('user')
    } catch {}
    // Best-effort cookie invalidation (server sets httpOnly cookie)
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.dispatchEvent(new CustomEvent('userLogout'))
  }

  useEffect(() => {
    checkAuthStatus()

    const handleLoginEvent = () => {
      checkAuthStatus()
    }

    const handleLogoutEvent = () => {
      checkAuthStatus()
    }

    window.addEventListener('userLogin', handleLoginEvent)
    window.addEventListener('userLogout', handleLogoutEvent)

    return () => {
      window.removeEventListener('userLogin', handleLoginEvent)
      window.removeEventListener('userLogout', handleLogoutEvent)
    }
  }, [])

  return {
    user,
    isLoggedIn,
    loading,
    login,
    logout,
    checkAuthStatus,
  }
}
