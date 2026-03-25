export interface User {
  id: string
  email: string
  name?: string
  token?: string
}

export interface LoginRequest {
  NombreUsuario: string
  Password: string
}
