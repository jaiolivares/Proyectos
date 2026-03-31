import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Landing() {
  return (
    <Container sx={{ pt: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button component={RouterLink} to="/login" variant="outlined">
          Login
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido a JOZ
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Aplicación de ejemplo — gestión de items y usuarios
        </Typography>
      </Box>
    </Container>
  )
}
