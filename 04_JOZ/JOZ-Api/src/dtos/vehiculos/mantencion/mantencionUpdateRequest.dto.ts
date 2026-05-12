export interface MantencionUpdateRequestDto {
  Fecha?: Date;
  IdTaller?: number;
  Servicio?: string;
  MontoTotal?: number;
  Boleta?: string | null;
}
