import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../utils/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const checkAuth = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      
      // Redirect if trying to access auth pages while logged in
      if (['/login', '/signup'].includes(location.pathname) && currentUser) {
        navigate(currentUser.role === 'student' ? '/dashboard/student' : '/dashboard/staff')
      }
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email, password, role) => {
    try {
      const userData = await loginUser(email, password, role)
      setUser(userData)
      toast.success('Login successful!')
      navigate(userData.role === 'student' ? '/dashboard/student' : '/dashboard/staff')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const register = async (userData) => {
    try {
      await registerUser(userData)
      toast.success('Registration successful! Please login.')
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = () => {
    logoutUser()
    setUser(null)
    toast.success('Logged out successfully!')
    navigate('/login')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)