import http from "../../api/httpClient";
import { CrudService } from "../../models/vehiculos/crud";
import { MarcaModeloVehiculo, MarcaModeloVehiculoPayload } from "../../models/vehiculos/marcaModeloVehiculo";
import { ApiCrudService } from "./apiCrud.service";

export interface IMarcaModeloVehiculoService extends CrudService<MarcaModeloVehiculo, MarcaModeloVehiculoPayload> {}

export class MarcaModeloVehiculoService extends ApiCrudService<MarcaModeloVehiculo, MarcaModeloVehiculoPayload> implements IMarcaModeloVehiculoService {
  constructor(httpClient = http) {
    super("/marcaModeloVehiculo", { singular: "la asociación", plural: "las asociaciones" }, httpClient);
  }
}
