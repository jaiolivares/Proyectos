export interface Usuario{
  Id: number;
  NombreUsuario: string;
  Password: string;
  Nombre: string;
  SegundoNombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Email: string;
  FechaCreacion: Date;
  FechaUltimoLogin?: Date | null;
  EstaBloqueado: number;
  EstaActivo: number;
}
