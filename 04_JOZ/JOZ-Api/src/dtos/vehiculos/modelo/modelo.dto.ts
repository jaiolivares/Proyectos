export class ModeloDto {
  Id: number;
  IdTipoVehiculo: number;
  Modelo: string;
  Descripcion: string;

  constructor(Id: number, IdTipoVehiculo: number, Modelo: string, Descripcion: string) {
    this.Id = Id;
    this.IdTipoVehiculo = IdTipoVehiculo;
    this.Modelo = Modelo;
    this.Descripcion = Descripcion;
  }
}
