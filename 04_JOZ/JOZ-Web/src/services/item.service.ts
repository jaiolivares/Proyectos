import http from '../api/httpClient'
import { Item, CreateItemRequest } from '../models/item'

export interface IItemService {
  fetchAll(): Promise<Item[]>
  create(payload: CreateItemRequest): Promise<Item>
}

export class ItemService implements IItemService {
  constructor(private readonly httpClient = http) {}

  async fetchAll(): Promise<Item[]> {
    // const resp = await this.httpClient.get('/api/items')
    // return resp.data as Item[]
    return null as any
  }

  async create(payload: CreateItemRequest): Promise<Item> {
    const resp = await this.httpClient.post('/api/items', payload)
    return resp.data as Item
  }
}
