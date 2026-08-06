import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth-store'

export function useAuth() {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const setToken = useAuthStore((state) => state.setToken)
  const clearToken = useAuthStore((state) => state.clearToken)

  function saveSession(newToken: string) {
    setToken(newToken)
  }

  function logout() {
    clearToken()
    navigate('/login')
  }

  return { saveSession, logout, isAuthenticated: Boolean(token), token }
}