export const AUTH_STORAGE_KEY = "joz.auth";

export interface User {
  Id: number;
  NombreUsuario: string;
  Nombre: string;
  SegundoNombre?: string;
  ApellidoPaterno?: string;
  ApellidoMaterno?: string;
  Email: string;
  token: string;
}

export interface LoginRequest {
  NombreUsuario: string;
  Password: string;
}
