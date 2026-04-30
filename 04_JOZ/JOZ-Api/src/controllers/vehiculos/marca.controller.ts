import { Request, Response } from "express";
import { MarcaQueryService } from "../../services/queries/vehiculos/marca/marca.query.service";
import { MarcaCommandService } from "../../services/commands/vehiculos/marca/marca.command.service";
import { MarcaCreateRequestDto } from "../../dtos/vehiculos/marca/marcaCreateRequest.dto";
import { MarcaCreateResponseDto } from "../../dtos/vehiculos/marca/marcaCreateResponse.dto";
import { MarcaUpdateRequestDto } from "../../dtos/vehiculos/marca/marcaUpdateRequest.dto";
import { MarcaUpdateResponseDto } from "../../dtos/vehiculos/marca/marcaUpdateResponse.dto";
import { ValidataEstructuraCreateBody } from "./validators/marcaCreate.validator";
import { ValidataEstructuraUpdateBody } from "./validators/marcaUpdate.validator";
import { NormalizaBody } from "../../utils/util";
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

  public async crear(req: Request<{}, {}, MarcaCreateRequestDto>, res: Response<Respuesta<MarcaCreateResponseDto>>): Promise<Response<Respuesta<MarcaCreateResponseDto>>> {
    try {
      NormalizaBody(req.body);
      const validation = ValidataEstructuraCreateBody(req.body);

      if (!validation.valid) {
        return res.status(400).json(respuestaError<MarcaCreateResponseDto>(validation.errors?.join('; ') ?? 'Body inválido'));
      }

      const created = await this.marcaCommandService.crearMarca(req.body);
      return res.status(201).json(respuestaOk<MarcaCreateResponseDto>(created));

    } catch (err: any) {
      return res.status(500).json(respuestaError<MarcaCreateResponseDto>(err?.message ?? 'error interno'));
    }
  }

  public async actualizar(req: Request<{ id: string }, {}, MarcaUpdateRequestDto>, res: Response<Respuesta<MarcaUpdateResponseDto>>): Promise<Response<Respuesta<MarcaUpdateResponseDto>>> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id))
        return res.status(400).json(respuestaError<MarcaUpdateResponseDto>("ID inválido"));

      if (req.body == null)
        return res.status(400).json(respuestaError<MarcaUpdateResponseDto>("No existen datos para actualizar"));

      NormalizaBody(req.body);
      const validation = ValidataEstructuraUpdateBody(req.body);

      if (!validation.valid) {
        return res.status(400).json(respuestaError<MarcaUpdateResponseDto>(validation.errors?.join('; ') ?? 'Body inválido'));
      }

      const updated = await this.marcaCommandService.actualizarMarca(id, req.body);
      if (!updated) return res.status(404).json(respuestaError<MarcaUpdateResponseDto>("Marca no encontrada"));

      return res.status(200).json(respuestaOk<MarcaUpdateResponseDto>(updated));

    } catch (err: any) {
      return res.status(500).json(respuestaError<MarcaUpdateResponseDto>(err?.message ?? 'error interno'));
    }
  }

  public async eliminar(req: Request, res: Response<Respuesta<null>>): Promise<Response<Respuesta<null>>> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id))
        return res.status(400).json(respuestaError<null>("ID inválido"));

      const deleted = await this.marcaCommandService.eliminarMarca(id);
      if (!deleted) return res.status(404).json(respuestaError<null>("Marca no encontrada"));

      return res.status(200).json(respuestaOk<null>(null));

    } catch (err: any) {
      return res.status(500).json(respuestaError<null>(err?.message ?? 'error interno'));
    }
  }
}
