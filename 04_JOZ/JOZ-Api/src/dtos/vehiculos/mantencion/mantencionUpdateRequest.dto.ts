export interface MantencionUpdateRequestDto {
  IdVehiculo: number;
  Fecha?: Date;
  IdTaller: number;
  Servicio?: string;
  MontoTotal?: number;
  Boleta?: string | null;
}
