import http from "../../api/httpClient";
import { CrudService } from "../../models/vehiculos/crud";
import { Marca, MarcaPayload } from "../../models/vehiculos/marca";
import { ApiCrudService } from "./apiCrud.service";

export interface IMarcaService extends CrudService<Marca, MarcaPayload> {}

export class MarcaService extends ApiCrudService<Marca, MarcaPayload> implements IMarcaService {
  constructor(httpClient = http) {
    super("/marca", { singular: "la marca", plural: "las marcas" }, httpClient);
  }
}
