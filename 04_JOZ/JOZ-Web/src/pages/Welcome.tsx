import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useAuthContext } from '../contexts/AuthContext'

export default function Welcome() {
  const { user } = useAuthContext()

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Box>
          <Typography variant="h4">Hola, {user?.name || user?.email}</Typography>
          <Typography sx={{ mt: 2 }}>
            Desde aquí puedes navegar a las distintas secciones usando la barra superior.
          </Typography>
        </Box>
      </Container>
    </>
  )
}
