export interface MantencionDTO {
  IdVehiculo: number;
  Fecha: Date;
  IdTaller: number;
  Servicio: string;
  MontoTotal: number;
  Boleta?: string;
  IdUsuario: number;
}

export interface MantencionUpdateDTO {
  Fecha?: Date;
  IdTaller?: number;
  Servicio?: string;
  MontoTotal?: number;
  Boleta?: string;
}
