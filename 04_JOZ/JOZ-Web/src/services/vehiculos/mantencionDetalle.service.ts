import http from "../../api/httpClient";
import { CrudService } from "../../models/vehiculos/crud";
import { MantencionDetalle, MantencionDetallePayload } from "../../models/vehiculos/mantencionDetalle";
import { ApiCrudService } from "./apiCrud.service";

export interface IMantencionDetalleService extends CrudService<MantencionDetalle, MantencionDetallePayload> {}

export class MantencionDetalleService extends ApiCrudService<MantencionDetalle, MantencionDetallePayload> implements IMantencionDetalleService {
  constructor(httpClient = http) {
    super("/mantencionDetalle", { singular: "el detalle", plural: "los detalles" }, httpClient);
  }
}
