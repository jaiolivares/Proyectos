import React from 'react'
import { List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material'
import { Item } from '../models/item'

type Props = {
  items: Item[]
  loading?: boolean
  error?: string | null
}

export default function ItemList({ items, loading, error }: Props) {
  if (loading) return <CircularProgress />
  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <List>
      {items.map(it => (
        <ListItem key={it.id} divider>
          <ListItemText primary={it.name} secondary={it.createdAt} />
        </ListItem>
      ))}
    </List>
  )
}
