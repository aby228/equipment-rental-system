import { useState, useEffect } from 'react'

interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
}

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkAuthStatus = () => {
    const token = document.cookie.includes('authToken')
    if (token) {
      // Mock user data - in production, fetch from API
      const userData = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: '/images/avatars/user.jpg'
      }
      setUser(userData)
      setIsLoggedIn(true)
    } else {
      setUser(null)
      setIsLoggedIn(false)
    }
    setLoading(false)
  }

  const login = (userData: UserData) => {
    setUser(userData)
    setIsLoggedIn(true)
    window.dispatchEvent(new CustomEvent('userLogin'))
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
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
    checkAuthStatus
  }
}
