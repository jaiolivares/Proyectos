export class MantencionDetalleDto {
  Id: number;
  IdMantencion: number;
  Producto: string;
  DetalleProducto: string;
  Monto: number;

  constructor(
    Id: number,
    IdMantencion: number,
    Producto: string,
    DetalleProducto: string,
    Monto: number,
  ) {
    this.Id = Id;
    this.IdMantencion = IdMantencion;
    this.Producto = Producto;
    this.DetalleProducto = DetalleProducto;
    this.Monto = Monto;
  }
}
