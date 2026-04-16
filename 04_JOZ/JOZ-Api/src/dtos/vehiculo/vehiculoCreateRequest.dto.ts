export interface VehiculoCreateRequestDto {
  IdMarcaModeloVehiculo: number;
  Ano: number;
  NumeroMotor: string;
  NumeroChasis: string;
  Color: string;
  FechaCompra: Date;
  MontoCompra: number;
  Vendido?: boolean | false;
  FechaVenta?: Date | null;
  MontoVenta?: number | null;
}
