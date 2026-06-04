export interface Vehiculo {
  Id: number;
  IdMarcaModeloVehiculo: number;
  Ano: number;
  NumeroMotor: string;
  NumeroChasis: string;
  Color: string;
  FechaCompra: string;
  MontoCompra: number;
  Vendido: boolean;
  FechaVenta?: string | null;
  MontoVenta?: number | null;
}

export interface VehiculoPayload {
  IdMarcaModeloVehiculo: number;
  Ano: number;
  NumeroMotor: string;
  NumeroChasis: string;
  Color: string;
  FechaCompra: string;
  MontoCompra: number;
  Vendido?: boolean;
  FechaVenta?: string | null;
  MontoVenta?: number | null;
}
