export interface Usuario {
  Id: number;
  NombreUsuario: string;
  Password?: string;
  Nombre: string;
  SegundoNombre?: string | null;
  ApellidoPaterno: string;
  ApellidoMaterno?: string | null;
  Email: string;
  FechaCreacion: Date;
  FechaUltimoLogin?: Date | null;
  EstaBloqueado: number;
  EstaActivo: number;
}
