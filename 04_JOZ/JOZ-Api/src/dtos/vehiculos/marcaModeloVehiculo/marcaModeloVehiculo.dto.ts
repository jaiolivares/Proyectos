export class MarcaModeloVehiculoDto {
  Id: number;
  IdMarca: number;
  IdModelo: number;

  constructor(Id: number, IdMarca: number, IdModeloVehiculo: number) {
    this.Id = Id;
    this.IdMarca = IdMarca;
    this.IdModelo = IdModeloVehiculo;
  }
}
