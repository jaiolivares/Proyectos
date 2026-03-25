import React, { useState } from 'react'
import { TextField, Button, Box, Alert } from '@mui/material'
import { LoginRequest } from '../models/user'

type Props = {
  onSubmit: (payload: LoginRequest) => Promise<void>
  loading?: boolean
  error?: string | null
}

export default function LoginForm({ onSubmit, loading, error }: Props) {
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [password, setPassword] = useState('')

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({ NombreUsuario: nombreUsuario, Password: password } as LoginRequest)
  }

  return (
    <Box component="form" onSubmit={handle} sx={{ display: 'grid', gap: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="NombreUsuario" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" type="submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </Button>
    </Box>
  )
}
