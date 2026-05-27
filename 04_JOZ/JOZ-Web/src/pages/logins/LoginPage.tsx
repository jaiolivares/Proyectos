import { Box } from '@mui/material'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import LoginForm from '../../components/logins/LoginForm'
import { useAuthContext } from '../../contexts/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login, loading, error } = useAuthContext()
  const from = location.state && typeof location.state === 'object' && 'from' in location.state
    ? (location.state.from as { pathname?: string })?.pathname || '/home'
    : '/home'

  if (user) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (payload: any) => {
    try {
      await login(payload)
      navigate(from, { replace: true })
    } catch (err) {
      // login hook already sets error
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
    </Box>
  )
}
