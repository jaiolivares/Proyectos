export interface Modelo {
  Id: number;
  IdTipoVehiculo: number;
  Modelo: string;
  Descripcion: string;
}

export interface ModeloPayload {
  IdTipoVehiculo: number;
  Modelo: string;
  Descripcion: string;
}
