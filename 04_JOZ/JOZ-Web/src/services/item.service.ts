import http from '../api/httpClient'
import { Item, CreateItemRequest } from '../models/item'

export interface IItemService {
  fetchAll(signal?: AbortSignal): Promise<Item[]>
  create(payload: CreateItemRequest): Promise<Item>
}

export class ItemService implements IItemService {
  constructor(private readonly httpClient = http) {}

  async fetchAll(signal?: AbortSignal): Promise<Item[]> {
    const resp = await this.httpClient.get('/api/item/all', { signal })
    return resp.data as Item[]
  }

  async create(payload: CreateItemRequest): Promise<Item> {
    const resp = await this.httpClient.post('/api/items', payload)
    return resp.data as Item
  }
}
