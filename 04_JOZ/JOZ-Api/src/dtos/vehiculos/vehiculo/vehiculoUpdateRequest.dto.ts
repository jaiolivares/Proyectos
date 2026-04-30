export interface VehiculoUpdateRequestDto {
  IdMarcaModeloVehiculo: number;
  Ano: number;
  NumeroMotor: string;
  NumeroChasis: string;
  Color: string;
  FechaCompra: Date;
  MontoCompra: number;
  Vendido?: boolean;
  FechaVenta?: Date | null;
  MontoVenta?: number | null;
}
