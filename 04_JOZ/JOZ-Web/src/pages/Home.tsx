import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import LoginForm from '../components/LoginForm'
import ItemList from '../components/ItemList'
import CreateItemForm from '../components/CreateItemForm'
import { AuthService } from '../services/auth.service'
import { ItemService } from '../services/item.service'
import { useAuth } from '../hooks/useAuth'
import { useItems } from '../hooks/useItems'

export default function Home() {
  const authService = new AuthService()
  const itemService = new ItemService()

  const { user, loading: authLoading, error: authError, login } = useAuth(authService)
  const { items, loading: itemsLoading, error: itemsError, create } = useItems(itemService)

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        JOZ - Frontend
      </Typography>

      {!user ? (
        <Box sx={{ maxWidth: 400 }}>
          <LoginForm onSubmit={async p => login(p)} loading={authLoading} error={authError} />
        </Box>
      ) : (
        <>
          <Typography variant="h6">Hola, {user.name || user.email}</Typography>
          <CreateItemForm onCreate={create} loading={itemsLoading} error={itemsError} />
          <ItemList items={items} loading={itemsLoading} error={itemsError} />
        </>
      )}
    </Container>
  )
}
