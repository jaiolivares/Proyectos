import { Request, Response } from "express";
import { MarcaQueryService } from "../../services/queries/vehiculos/marca/marca.query.service";
import { MarcaCommandService } from "../../services/commands/vehiculos/marca/marca.command.service";
import { respuestaOk, respuestaError } from "../../dtos/utils/respuesta.dto";
import type { Respuesta } from "../../dtos/utils/respuesta.dto";
import { MarcaDto } from "../../dtos/vehiculos/marca/marca.dto";

export class MarcaController {
  private marcaQueryService: MarcaQueryService;
  private marcaCommandService: MarcaCommandService;

  constructor(marcaCommandService: MarcaCommandService, marcaQueryService: MarcaQueryService) {
    this.marcaCommandService = marcaCommandService;
    this.marcaQueryService = marcaQueryService;
  }

  public async obtenerTodos(_: Request, res: Response<Respuesta<MarcaDto[]>>): Promise<Response<Respuesta<MarcaDto[]>>> {
    const items = await this.marcaQueryService.obtenerMarcas();

    if (items.length === 0)
      return res.status(404).json(respuestaError<MarcaDto[]>("No se encontraron Marcas"));

    return res.status(200).json(respuestaOk<MarcaDto[]>(items));
  }

  public async obtenerPorId(req: Request, res: Response<Respuesta<MarcaDto>>): Promise<Response<Respuesta<MarcaDto>>> {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(respuestaError<MarcaDto>("ID inválido"));

    const found = await this.marcaQueryService.obtenerMarca(id);
    if (!found) return res.status(404).json(respuestaError<MarcaDto>("Marca no encontrada"));

    return res.status(200).json(respuestaOk<MarcaDto>(found));
  }

  public async crear(req: Request<{}, {}, any>, res: Response<Respuesta<any>>): Promise<Response<Respuesta<any>>> {
    const created = await this.marcaCommandService.crearMarca(req.body);
    return res.status(201).json(respuestaOk<any>(created));
  }

  public async actualizar(req: Request<{ id: string }, {}, any>, res: Response<Respuesta<any>>): Promise<Response<Respuesta<any>>> {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(respuestaError<any>("ID inválido"));

    const updated = await this.marcaCommandService.actualizarMarca(id, req.body);
    if (!updated) return res.status(404).json(respuestaError<any>("Marca no encontrada"));

    return res.status(200).json(respuestaOk<any>(updated));
  }

  public async eliminar(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(respuestaError<null>("ID inválido"));

    const deleted = await this.marcaCommandService.eliminarMarca(id);
    if (!deleted) return res.status(404).json(respuestaError<null>("Marca no encontrada"));

    return res.status(204).send();
  }
}
