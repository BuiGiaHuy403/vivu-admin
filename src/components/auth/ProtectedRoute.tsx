


import React from 'react'
import type { ProtectedRouteProps } from '../../types/auth'
import { useAuth } from '../../hooks/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { loading, user, isAuthenticated } = useAuth()
  const location = useLocation()
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-lg'>Loading...</div>
      </div>
    )
    
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}

export default ProtectedRoute