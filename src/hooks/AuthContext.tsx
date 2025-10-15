import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, AuthProviderProps, User } from "../types/auth";
import { decodeToken, isTokenExpired, isValidJwt } from "../lib/jwt";



const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => { 
  const [user, setUser] = useState<User | null> (null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()  => {
    try {
      const savedToken = localStorage.getItem('access_token')
      if (!savedToken) {
        setLoading(false)
        return
      }

      // Validate token structure and expiry
      if (!isValidJwt(savedToken) || isTokenExpired(savedToken)) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        setLoading(false)
        return
      }

      // Decode token to get user info
      const decodedUser = decodeToken(savedToken)
      if (!decodedUser) {
        console.error('Failed to decode JWT token')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        setLoading(false)
        return
      }

      // Ensure admin role
      if (decodedUser.role.toLowerCase() !== 'admin') {
        console.warn('Access denied. User is not an administrator')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        setLoading(false)
        return
      }

      setToken(savedToken)
      setUser(decodedUser)
      setLoading(false)
    } catch (error) {
      console.error('Error processing saved token:', error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      setLoading(false)
    }
  }, []);
   const login = (newToken: string) => {
    try {
      // Validate and decode the new token
      const isValid = isValidJwt(newToken)
      if (!isValid) {
        throw new Error('Invalid JWT token format')
      }

      const isExpired = isTokenExpired(newToken)
      if (isExpired) {
        throw new Error('JWT token has expired')
      }

      const decodedUser = decodeToken(newToken)
      if (!decodedUser) {
        throw new Error('Failed to decode JWT token')
      }

      // Check if user has admin role
      if (decodedUser.role.toLowerCase() !== 'admin') {
        throw new Error('Access denied. Only administrators can access this system.')
      }

      // Save token and user data
      localStorage.setItem('access_token', newToken)
      localStorage.setItem('user', JSON.stringify(decodedUser))
      setToken(newToken)
      setUser(decodedUser)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    loading
  }

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>

}

