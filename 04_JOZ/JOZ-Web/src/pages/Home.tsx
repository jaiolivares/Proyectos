import { Container, Typography } from '@mui/material'
import ItemsArea from '../components/ItemsArea'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'
import { AuthService } from '../services/auth.service'

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
          <Typography variant="h6">Hola x, {user.NombreUsuario || user.email}</Typography>
          <ItemsArea />
        </>
      )}

    </Container>
  )
}
