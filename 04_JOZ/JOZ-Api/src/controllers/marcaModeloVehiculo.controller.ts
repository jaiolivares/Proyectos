import { Request, Response } from "express";
import { MarcaModeloVehiculoQueryService } from "../services/queries/marcaModeloVehiculo/marcaModeloVehiculo.query.service";
import { MarcaModeloVehiculoCommandService } from "../services/commands/marcaModeloVehiculo/marcaModeloVehiculo.command.service";
import { respuestaOk, respuestaError } from "../dtos/utils/respuesta.dto";
import type { Respuesta } from "../dtos/utils/respuesta.dto";
import { MarcaModeloVehiculoDto } from "../dtos/marcaModeloVehiculo/marcaModeloVehiculo.dto";

export class MarcaModeloVehiculoController {
  private marcaModeloVehiculoQueryService: MarcaModeloVehiculoQueryService;
  private marcaModeloVehiculoCommandService: MarcaModeloVehiculoCommandService;

  constructor(marcaModeloVehiculoCommandService: MarcaModeloVehiculoCommandService, marcaModeloVehiculoQueryService: MarcaModeloVehiculoQueryService) {
    this.marcaModeloVehiculoCommandService = marcaModeloVehiculoCommandService;
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

  public async crear(req: Request<{}, {}, MarcaModeloVehiculoDto>, res: Response<Respuesta<MarcaModeloVehiculoDto>>): Promise<Response<Respuesta<MarcaModeloVehiculoDto>>> {
    const created = await this.marcaModeloVehiculoCommandService.crearMarcaModeloVehiculo(req.body);
    return res.status(201).json(respuestaOk<MarcaModeloVehiculoDto>(created));
  }

  public async actualizar(req: Request<{ id: string }, {}, Partial<MarcaModeloVehiculoDto>>, res: Response<Respuesta<MarcaModeloVehiculoDto>>): Promise<Response<Respuesta<MarcaModeloVehiculoDto>>> {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(respuestaError<MarcaModeloVehiculoDto>("ID inválido"));

    const updated = await this.marcaModeloVehiculoCommandService.actualizarMarcaModeloVehiculo(id, req.body);
    if (!updated) return res.status(404).json(respuestaError<MarcaModeloVehiculoDto>("Modelo asociado a la marca no encontrado"));

    return res.status(200).json(respuestaOk<MarcaModeloVehiculoDto>(updated));
  }

  public async eliminar(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(respuestaError<null>("ID inválido"));

    const deleted = await this.marcaModeloVehiculoCommandService.eliminarMarcaModeloVehiculo(id);
    if (!deleted) return res.status(404).json(respuestaError<null>("Modelo asociado a la marca no encontrado"));

    return res.status(204).send();
  }

}
