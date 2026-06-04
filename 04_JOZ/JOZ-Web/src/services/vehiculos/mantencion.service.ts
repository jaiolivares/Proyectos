import http from "../../api/httpClient";
import { CrudService } from "../../models/vehiculos/crud";
import { Mantencion, MantencionPayload } from "../../models/vehiculos/mantencion";
import { ApiCrudService } from "./apiCrud.service";

export interface IMantencionService extends CrudService<Mantencion, MantencionPayload> {}

export class MantencionService extends ApiCrudService<Mantencion, MantencionPayload> implements IMantencionService {
  constructor(httpClient = http) {
    super("/mantencion", { singular: "la mantención", plural: "las mantenciones" }, httpClient);
  }
}
