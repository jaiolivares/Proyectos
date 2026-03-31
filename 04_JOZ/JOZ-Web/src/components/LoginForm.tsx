import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { LoginRequest } from '../models/user'

type Props = {
  onSubmit: (payload: LoginRequest) => Promise<void>
  loading?: boolean
  error?: string | null
}

export default function LoginForm({ onSubmit, loading, error }: Props) {
  const [nombreUsuario, setNombreUsuario] = useState('aaa2')
  const [password, setPassword] = useState('123')

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({ NombreUsuario: nombreUsuario, Password: password } as LoginRequest)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handle} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nombreUsuario"
            label="Nombre de usuario"
            name="nombreUsuario"
            autoComplete="username"
            autoFocus
            value={nombreUsuario}
            onChange={e => setNombreUsuario(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2 }}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
          
        </Box>
      </Box>
    </Container>
  )
}
