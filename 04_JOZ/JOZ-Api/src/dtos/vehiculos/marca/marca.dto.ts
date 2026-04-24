export class MarcaDto {
  Id: number;
  Marca: string;
  Descripcion: string;

  constructor(Id: number, Marca: string, Descripcion: string) {
    this.Id = Id;
    this.Marca = Marca;
    this.Descripcion = Descripcion;
  }
}
