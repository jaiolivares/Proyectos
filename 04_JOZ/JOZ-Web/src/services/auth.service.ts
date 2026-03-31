import http from '../api/httpClient'
import { LoginRequest, User } from '../models/user'

export interface IAuthService {
  login(payload: LoginRequest): Promise<User>
}

export class AuthService implements IAuthService {
  constructor(private readonly httpClient = http) {}

  async login(payload: LoginRequest): Promise<User> {
    const resp = await this.httpClient.post('/auth/login', payload)
    return resp.data as User
  }
}
