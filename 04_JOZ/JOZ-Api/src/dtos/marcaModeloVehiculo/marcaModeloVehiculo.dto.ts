export class MarcaModeloVehiculoDto {
  Id: number;
  IdMarca: number;
  IdModeloVehiculo: number;

  constructor(
    Id: number,
    IdMarca: number,
    IdModeloVehiculo: number
  ) {
    this.Id = Id;
    this.IdMarca = IdMarca;
    this.IdModeloVehiculo = IdModeloVehiculo;
  }
}