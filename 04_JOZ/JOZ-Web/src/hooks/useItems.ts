import { useState, useEffect, useCallback } from 'react'
import { ItemService, IItemService } from '../services/item.service'
import { Item, CreateItemRequest } from '../models/item'

export function useItems(itemService: IItemService = new ItemService()) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError(null)
    try {
      const list = await itemService.fetchAll(signal)
      setItems(list)
    } catch (err: any) {
      if (err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError') return
      setError(err?.response?.data?.message || err.message || 'Fetch error')
    } finally {
      setLoading(false)
    }
  }, [itemService])

  const create = async (payload: CreateItemRequest) => {
    setLoading(true)
    setError(null)
    try {
      const it = await itemService.create(payload)
      setItems(prev => [it, ...prev])
      return it
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Create error')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    fetch(controller.signal)
    return () => controller.abort()
  }, [fetch])

  return { items, loading, error, fetch, create }
}
