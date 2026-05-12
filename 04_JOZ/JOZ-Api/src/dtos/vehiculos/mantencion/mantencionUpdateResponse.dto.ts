export interface MantencionUpdateResponseDto {
  Id: number;
  IdVehiculo: number;
  Fecha: Date;
  IdTaller: number;
  Servicio: string;
  MontoTotal: number;
  Boleta?: string | null;
  IdUsuario: number;
}
