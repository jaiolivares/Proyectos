export class UsuarioDto {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  email: string;

  constructor(id: number, nombre: string, apellidoPaterno: string, email: string) {
    this.id = id;
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.email = email;
  }
}
