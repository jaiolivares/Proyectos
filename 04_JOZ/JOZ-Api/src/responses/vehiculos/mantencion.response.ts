export interface MantencionResponse {
  Id: number;
  IdVehiculo: number;
  Fecha: Date;
  IdTaller: number;
  Servicio: string;
  MontoTotal: number;
  Boleta?: string;
  IdUsuario: number;
}

export interface MantencionListResponse {
  data: MantencionResponse[];
  total: number;
}
