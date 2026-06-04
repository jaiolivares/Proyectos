import http from "../../api/httpClient";
import { CrudService } from "../../models/vehiculos/crud";
import { Modelo, ModeloPayload } from "../../models/vehiculos/modelo";
import { ApiCrudService } from "./apiCrud.service";

export interface IModeloService extends CrudService<Modelo, ModeloPayload> {}

export class ModeloService extends ApiCrudService<Modelo, ModeloPayload> implements IModeloService {
  constructor(httpClient = http) {
    super("/modelo", { singular: "el modelo", plural: "los modelos" }, httpClient);
  }
}
