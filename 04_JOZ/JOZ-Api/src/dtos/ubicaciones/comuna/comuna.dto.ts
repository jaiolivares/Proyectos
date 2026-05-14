export class ComunaDto {
  Id: number;
  IdCiudad: number;
  Codigo: string;
  Descripcion: string;

  constructor(Id: number, IdCiudad: number, Codigo: string, Descripcion: string) {
    this.Id = Id;
    this.IdCiudad = IdCiudad;
    this.Codigo = Codigo;
    this.Descripcion = Descripcion;
  }
}
