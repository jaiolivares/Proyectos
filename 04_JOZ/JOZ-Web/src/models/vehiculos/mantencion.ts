export interface Mantencion {
  Id: number;
  IdVehiculo: number;
  Fecha: string;
  IdTaller: number;
  Servicio: string;
  MontoTotal: number;
  Kilometraje?: number | null;
  Boleta?: string | null;
  IdUsuarioCreacion: number;
}

export interface MantencionPayload {
  IdVehiculo: number;
  Fecha: string;
  IdTaller: number;
  Servicio: string;
  MontoTotal: number;
  Kilometraje?: number | null;
  Boleta?: string | null;
  IdUsuario?: number;
}
