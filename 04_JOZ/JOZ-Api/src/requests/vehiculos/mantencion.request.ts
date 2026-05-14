import { MantencionDTO, MantencionUpdateDTO } from "../../dtos/vehiculos/mantencion.dto";

export class CreateMantencionRequest implements MantencionDTO {
  IdVehiculo: number;
  Fecha: Date;
  IdTaller: number;
  Servicio: string;
  MontoTotal: number;
  Boleta?: string;
  IdUsuario: number;

  constructor(payload: MantencionDTO) {
    this.IdVehiculo = payload.IdVehiculo;
    this.Fecha = payload.Fecha;
    this.IdTaller = payload.IdTaller;
    this.Servicio = payload.Servicio;
    this.MontoTotal = payload.MontoTotal;
    this.Boleta = payload.Boleta;
    this.IdUsuario = payload.IdUsuario;
  }
}

export class UpdateMantencionRequest implements MantencionUpdateDTO {
  Fecha?: Date;
  IdTaller?: number;
  Servicio?: string;
  MontoTotal?: number;
  Boleta?: string;

  constructor(payload: MantencionUpdateDTO) {
    this.Fecha = payload.Fecha;
    this.IdTaller = payload.IdTaller;
    this.Servicio = payload.Servicio;
    this.MontoTotal = payload.MontoTotal;
    this.Boleta = payload.Boleta;
  }
}
