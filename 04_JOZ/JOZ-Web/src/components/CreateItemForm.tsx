import React, { useState } from 'react'
import { TextField, Button, Box, Alert } from '@mui/material'
import { CreateItemRequest } from '../models/item'

type Props = {
  onCreate: (payload: CreateItemRequest) => Promise<void>
  loading?: boolean
  error?: string | null
}

export default function CreateItemForm({ onCreate, loading, error }: Props) {
  const [name, setName] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onCreate({ name })
    setName('')
  }

  return (
    <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2, mt: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <Button type="submit" variant="contained" disabled={loading || !name}>
        {loading ? 'Creando...' : 'Crear'}
      </Button>
    </Box>
  )
}
