import { Box, Container, Typography } from '@mui/material'
import { useAuthContext } from '../contexts/AuthContext'

export default function Talleres() {
  const { user } = useAuthContext()

  return (
    <>
    <h1>Talleres</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, sed perspiciatis. Iste, corporis odit dolorum laborum magnam cupiditate. Vitae nostrum magni accusantium aut perferendis, praesentium distinctio exercitationem impedit hic provident!</p>
      <Container sx={{ mt: 4 }}>
        <Box>
          <Typography variant="h4">Hola cx, {user?.name || user?.email}</Typography>
          <Typography sx={{ mt: 2 }}>
            Desde aquí puedes navegar a las distintas secciones usando la barra superior.
          </Typography>
        </Box>
      </Container>
    </>
  )
}
