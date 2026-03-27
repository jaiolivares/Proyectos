import React, { useMemo } from 'react'
import CreateItemForm from './CreateItemForm'
import ItemList from './ItemList'
import { ItemService } from '../services/item.service'
import { useItems } from '../hooks/useItems'

export default function ItemsArea() {
  const itemService = useMemo(() => new ItemService(), [])
  const { items, loading, error, create } = useItems(itemService)

  return (
    <>
      <CreateItemForm onCreate={create} loading={loading} error={error} />
      <ItemList items={items} loading={loading} error={error} />
    </>
  )
}
