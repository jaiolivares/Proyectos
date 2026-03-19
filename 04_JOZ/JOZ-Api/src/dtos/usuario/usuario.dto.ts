export class UsuarioDto {
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
  EstaBloqueado: boolean;
  EstaActivo: boolean;

  constructor(
    Id: number,
    NombreUsuario: string,
    Password: string,
    Nombre: string,
    SegundoNombre: string,
    ApellidoPaterno: string,
    ApellidoMaterno: string,
    Email: string,
    FechaCreacion: Date,
    FechaUltimoLogin: Date | null,
    EstaBloqueado: boolean,
    EstaActivo: boolean
  ) {
    this.Id = Id;
    this.NombreUsuario = NombreUsuario;
    this.Password = Password;
    this.Nombre = Nombre;
    this.SegundoNombre = SegundoNombre;
    this.ApellidoPaterno = ApellidoPaterno;
    this.ApellidoMaterno = ApellidoMaterno;
    this.Email = Email;
    this.FechaCreacion = FechaCreacion;
    this.FechaUltimoLogin = FechaUltimoLogin;
    this.EstaBloqueado = EstaBloqueado;
    this.EstaActivo = EstaActivo;
  }
}
