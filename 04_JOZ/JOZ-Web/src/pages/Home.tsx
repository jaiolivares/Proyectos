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
          <LoginForm onSubmit={async p => { await login(p) }} loading={authLoading} error={authError} />
        // </Box>
      ) : (
          <>
          <Typography variant="h6">Hola x, {user.Nombre || user.NombreUsuario || user.Email}</Typography>
          <ItemsArea />
        </>
      )}

    </Container>
  )
}
