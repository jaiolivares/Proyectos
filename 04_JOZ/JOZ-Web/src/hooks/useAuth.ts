import { useState } from 'react'
import { AuthService, IAuthService } from '../services/auth.service'
import { LoginRequest, User } from '../models/user'

export function useAuth(authService: IAuthService = new AuthService()) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (payload: LoginRequest) => {
    setLoading(true)
    setError(null)
    try {
      const u = await authService.login(payload)
      setUser(u)
      return u
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Login error')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { user, loading, error, login }
}
