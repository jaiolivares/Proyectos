import { Container, Typography, Box } from '@mui/material'
import LoginForm from '../components/LoginForm'
import ItemsArea from '../components/ItemsArea'
import { AuthService } from '../services/auth.service'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const authService = new AuthService()

  const { user, loading: authLoading, error: authError, login } = useAuth(authService)

  return (
    <Container className="container">

      {!user ? (
        // <Box  component="section" sx={{ maxWidth: 400, margin: '0 auto' }}>
          <LoginForm onSubmit={async p => login(p)} loading={authLoading} error={authError} />
        // </Box>
      ) : (
        <>
          <Typography variant="h6">Hola, {user.name || user.email}</Typography>
          <ItemsArea />
        </>
      )}

    </Container>
  )
}
