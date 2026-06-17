export class TallerDto {
  Id: number;
  Nombre: string;
  IdComuna: number;
  Direccion: string;
  Comuna?: { Codigo: string; Descripcion: string };

  constructor(Id: number, Nombre: string, IdComuna: number, Direccion: string) {
    this.Id = Id;
    this.Nombre = Nombre;
    this.IdComuna = IdComuna;
    this.Direccion = Direccion;
  }
}
