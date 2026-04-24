import { Request, Response } from "express";
import { MarcaModeloVehiculoQueryService } from "../services/queries/marcaModeloVehiculo/marcaModeloVehiculo.query.service";
import { respuestaOk, respuestaError } from "../dtos/utils/respuesta.dto";
import type { Respuesta } from "../dtos/utils/respuesta.dto";
import { MarcaModeloVehiculoDto } from "../dtos/marcaModeloVehiculo/marcaModeloVehiculo.dto";

export class MarcaModeloVehiculoController {
  private marcaModeloVehiculoQueryService: MarcaModeloVehiculoQueryService;

  constructor(marcaModeloVehiculoQueryService: MarcaModeloVehiculoQueryService) {
    this.marcaModeloVehiculoQueryService = marcaModeloVehiculoQueryService;
  }

  public async obtenerTodos(_: Request, res: Response<Respuesta<MarcaModeloVehiculoDto[]>>): Promise<Response<Respuesta<MarcaModeloVehiculoDto[]>>> {
    const items = await this.marcaModeloVehiculoQueryService.obtenerMarcaModeloVehiculos();

    if (items.length === 0)
      return res.status(404).json(respuestaError<MarcaModeloVehiculoDto[]>("No se encontraron Modelos asociados a la marca"));

    return res.status(200).json(respuestaOk<MarcaModeloVehiculoDto[]>(items));
  }

  public async obtenerPorId(req: Request, res: Response<Respuesta<MarcaModeloVehiculoDto>>): Promise<Response<Respuesta<MarcaModeloVehiculoDto>>> {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json(respuestaError<MarcaModeloVehiculoDto>("ID inválido"));

    const found = await this.marcaModeloVehiculoQueryService.obtenerMarcaModeloVehiculo(id);
    
    if (!found)
      return res.status(404).json(respuestaError<MarcaModeloVehiculoDto>("Modelo asociado a la marca no encontrado"));
    
    return res.status(200).json(respuestaOk<MarcaModeloVehiculoDto>(found));
  }

}
