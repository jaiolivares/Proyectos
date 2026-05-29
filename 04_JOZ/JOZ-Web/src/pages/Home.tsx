import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useAuthContext } from '../contexts/AuthContext'

export default function Home() {
  const { user } = useAuthContext()
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Box>
          <Typography variant="h4">Hola, {displayName}</Typography>
          <Typography sx={{ mt: 2 }}>
            Desde aquí puedes navegar a las distintas secciones usando la barra superior.
          </Typography>
        </Box>
      </Container>
    </>
  )
}
