export interface UsuarioUpdateResponseDto {
  Id: number;
  NombreUsuario: string;
  Nombre: string;
  SegundoNombre: string | null;
  ApellidoPaterno: string;
  ApellidoMaterno: string | null;
  Email: string;
  FechaCreacion: Date;
}