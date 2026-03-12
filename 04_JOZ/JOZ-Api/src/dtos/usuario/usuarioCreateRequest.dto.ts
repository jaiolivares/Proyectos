export interface UsuarioCreateRequestDto {
  NombreUsuario: string;
  Password: string;
  Nombre: string;
  SegundoNombre: string | null;
  ApellidoPaterno: string;
  ApellidoMaterno: string | null;
  Email: string;
}
