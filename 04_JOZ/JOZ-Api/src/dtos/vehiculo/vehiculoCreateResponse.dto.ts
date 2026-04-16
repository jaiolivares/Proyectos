export interface VehiculoCreateResponseDto {
  Id: number;
  IdMarcaModeloVehiculo: number;
  Ano: number;
  NumeroMotor: string;
  NumeroChasis: string;
  Color: string;
  FechaCompra: Date;
  MontoCompra: number;
}
