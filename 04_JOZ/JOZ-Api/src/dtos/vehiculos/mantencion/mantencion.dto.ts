export class MantencionDto {
  Id: number;
  IdVehiculo: number;
  Fecha: Date;
  IdTaller: number;
  Servicio: string;
  MontoTotal: number;
  Kilometraje?: number | null;
  Boleta?: string | null;
  IdUsuarioCreacion: number;

  constructor(Id: number, IdVehiculo: number, Fecha: Date, IdTaller: number, Servicio: string, MontoTotal: number, IdUsuarioCreacion: number, Kilometraje?: number | null, Boleta?: string | null) {
    this.Id = Id;
    this.IdVehiculo = IdVehiculo;
    this.Fecha = Fecha;
    this.IdTaller = IdTaller;
    this.Servicio = Servicio;
    this.MontoTotal = MontoTotal;
    this.Kilometraje = Kilometraje;
    this.Boleta = Boleta;
    this.IdUsuarioCreacion = IdUsuarioCreacion;
  }
}
