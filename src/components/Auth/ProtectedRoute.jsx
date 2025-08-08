import { useAuth } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth()

  // Handle loading state
  if (user === undefined) {
    return <div>Loading...</div>
  }

  // Handle not logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Handle missing role
  if (!user.role) {
    console.error('User object missing role property:', user)
    return <Navigate to="/" replace />
  }

  // Handle role-based access
  if (allowedRoles && Array.isArray(allowedRoles) && !allowedRoles.includes(user.role)) {
    console.warn(`Access denied for role: ${user.role}. Allowed roles: ${allowedRoles.join(', ')}`)
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
