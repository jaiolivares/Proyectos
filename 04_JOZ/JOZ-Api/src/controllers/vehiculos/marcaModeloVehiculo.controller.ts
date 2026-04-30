import { Request, Response } from "express";
import { MarcaModeloVehiculoQueryService } from "../../services/queries/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.query.service";
import { MarcaModeloVehiculoCommandService } from "../../services/commands/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.command.service";
import { MarcaModeloVehiculoCreateRequestDto } from "../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoCreateRequest.dto";
import { MarcaModeloVehiculoCreateResponseDto } from "../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoCreateResponse.dto";
import { MarcaModeloVehiculoUpdateRequestDto } from "../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoUpdateRequest.dto";
import { MarcaModeloVehiculoUpdateResponseDto } from "../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoUpdateResponse.dto";
import { ValidataEstructuraCreateBody } from "./validators/marcaModeloVehiculoCreate.validator";
import { ValidataEstructuraUpdateBody } from "./validators/marcaModeloVehiculoUpdate.validator";
import { NormalizaBody } from "../../utils/util";
import { respuestaOk, respuestaError } from "../../dtos/utils/respuesta.dto";
import type { Respuesta } from "../../dtos/utils/respuesta.dto";
import { MarcaModeloVehiculoDto } from "../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.dto";

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

  public async crear(req: Request<{}, {}, MarcaModeloVehiculoCreateRequestDto>, res: Response<Respuesta<MarcaModeloVehiculoCreateResponseDto>>): Promise<Response<Respuesta<MarcaModeloVehiculoCreateResponseDto>>> {
    try {
      NormalizaBody(req.body);
      const validation = ValidataEstructuraCreateBody(req.body);

      if (!validation.valid) {
        return res.status(400).json(respuestaError<MarcaModeloVehiculoCreateResponseDto>(validation.errors?.join('; ') ?? 'Body inválido'));
      }

      const created = await this.marcaModeloVehiculoCommandService.crearMarcaModeloVehiculo(req.body);
      return res.status(201).json(respuestaOk<MarcaModeloVehiculoCreateResponseDto>(created));

    } catch (err: any) {
      return res.status(500).json(respuestaError<MarcaModeloVehiculoCreateResponseDto>(err?.message ?? 'error interno'));
    }
  }

  public async actualizar(req: Request<{ id: string }, {}, MarcaModeloVehiculoUpdateRequestDto>, res: Response<Respuesta<MarcaModeloVehiculoUpdateResponseDto>>): Promise<Response<Respuesta<MarcaModeloVehiculoUpdateResponseDto>>> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json(respuestaError<MarcaModeloVehiculoUpdateResponseDto>("ID inválido"));

      if (req.body == null) return res.status(400).json(respuestaError<MarcaModeloVehiculoUpdateResponseDto>("No existen datos para actualizar"));

      NormalizaBody(req.body);
      const validation = ValidataEstructuraUpdateBody(req.body);
      if (!validation.valid) return res.status(400).json(respuestaError<MarcaModeloVehiculoUpdateResponseDto>(validation.errors?.join('; ') ?? 'Body inválido'));

      const updated = await this.marcaModeloVehiculoCommandService.actualizarMarcaModeloVehiculo(id, req.body);
      if (!updated) return res.status(404).json(respuestaError<MarcaModeloVehiculoUpdateResponseDto>("Modelo asociado a la marca no encontrado"));

      return res.status(200).json(respuestaOk<MarcaModeloVehiculoUpdateResponseDto>(updated));

    } catch (err: any) {
      return res.status(500).json(respuestaError<MarcaModeloVehiculoUpdateResponseDto>(err?.message ?? 'error interno'));
    }
  }

  public async eliminar(req: Request, res: Response<Respuesta<null>>): Promise<Response<Respuesta<null>>> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json(respuestaError<null>("ID inválido"));

      const deleted = await this.marcaModeloVehiculoCommandService.eliminarMarcaModeloVehiculo(id);
      if (!deleted) return res.status(404).json(respuestaError<null>("Modelo asociado a la marca no encontrado"));

      return res.status(200).json(respuestaOk<null>(null));

    } catch (err: any) {
      return res.status(500).json(respuestaError<null>(err?.message ?? 'error interno'));
    }
  }

}
