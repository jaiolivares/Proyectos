export interface MantencionDetalle {
  Id: number;
  IdMantencion: number;
  Producto: string;
  DetalleProducto: string;
  Monto: number;
}

export interface MantencionDetallePayload {
  IdMantencion: number;
  Producto: string;
  DetalleProducto: string;
  Monto: number;
}
