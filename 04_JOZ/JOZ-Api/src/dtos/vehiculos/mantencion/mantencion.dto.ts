export class MantencionDto {
  Id: number;
  IdVehiculo: number;
  Fecha: Date;
  IdTaller: number;
  Servicio: string;
  MontoTotal: number;
  Boleta?: string | null;
  IdUsuario: number;

  constructor(
    Id: number,
    IdVehiculo: number,
    Fecha: Date,
    IdTaller: number,
    Servicio: string,
    MontoTotal: number,
    Boleta: string | null,
    IdUsuario: number,
  ) {
    this.Id = Id;
    this.IdVehiculo = IdVehiculo;
    this.Fecha = Fecha;
    this.IdTaller = IdTaller;
    this.Servicio = Servicio;
    this.MontoTotal = MontoTotal;
    this.Boleta = Boleta;
    this.IdUsuario = IdUsuario;
  }
}
