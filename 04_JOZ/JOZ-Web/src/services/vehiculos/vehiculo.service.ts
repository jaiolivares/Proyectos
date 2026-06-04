import http from "../../api/httpClient";
import { CrudService } from "../../models/vehiculos/crud";
import { Vehiculo, VehiculoPayload } from "../../models/vehiculos/vehiculo";
import { ApiCrudService } from "./apiCrud.service";

export interface IVehiculoService extends CrudService<Vehiculo, VehiculoPayload> {}

export class VehiculoService extends ApiCrudService<Vehiculo, VehiculoPayload> implements IVehiculoService {
  constructor(httpClient = http) {
    super("/vehiculo", { singular: "el vehículo", plural: "los vehículos" }, httpClient);
  }
}
