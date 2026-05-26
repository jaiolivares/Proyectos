export interface MantencionUpdateRequestDto {
  IdVehiculo: number;
  Fecha?: Date;
  IdTaller: number;
  Servicio?: string;
  MontoTotal?: number;
  Kilometraje?: number | null;
  Boleta?: string | null;
}
