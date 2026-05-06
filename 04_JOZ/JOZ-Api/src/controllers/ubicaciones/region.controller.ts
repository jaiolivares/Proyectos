// import { Request, Response } from "express";
// import { VehiculoCommandService } from "../../services/commands/vehiculos/vehiculo/vehiculo.command.service";
// import { VehiculoQueryService } from "../../services/queries/vehiculos/vehiculo/vehiculo.query.service";
// import { VehiculoCreateRequestDto } from "../../dtos/vehiculos/vehiculo/vehiculoCreateRequest.dto";
// import { VehiculoCreateResponseDto } from "../../dtos/vehiculos/vehiculo/vehiculoCreateResponse.dto";
// import { ValidataEstructuraCreateBody } from "./validators/vehiculoCreate.validator";
// import { ValidataEstructuraUpdateBody } from "./validators/vehiculoUpdate.validator";
// import { NormalizaBody } from "../../utils/util";
// import { VehiculoUpdateRequestDto } from "../../dtos/vehiculos/vehiculo/vehiculoUpdateRequest.dto";
// import { VehiculoUpdateResponseDto } from "../../dtos/vehiculos/vehiculo/vehiculoUpdateResponse.dto";
// import { respuestaOk, respuestaError } from "../../dtos/utils/respuesta.dto";
// import type { Respuesta } from "../../dtos/utils/respuesta.dto";
// import { VehiculoDto } from "../../dtos/vehiculos/vehiculo/vehiculo.dto";

// export class VehiculoController {
//   private vehiculoCommandService: VehiculoCommandService;
//   private vehiculoQueryService: VehiculoQueryService;

//   constructor(vehiculoCommandService: VehiculoCommandService, vehiculoQueryService: VehiculoQueryService) {
//     this.vehiculoCommandService = vehiculoCommandService;
//     this.vehiculoQueryService = vehiculoQueryService;
//   }

//   public async obtenerTodos(_: Request, res: Response<Respuesta<VehiculoDto[]>>): Promise<Response<Respuesta<VehiculoDto[]>>> {
//     const items = await this.vehiculoQueryService.obtenerVehiculos();

//     if (items.length === 0)
//       return res.status(404).json(respuestaError<VehiculoDto[]>("No se encontraron Vehículos"));

//     return res.status(200).json(respuestaOk<VehiculoDto[]>(items));
//   }

//   public async obtenerPorId(req: Request, res: Response<Respuesta<VehiculoDto>>): Promise<Response<Respuesta<VehiculoDto>>> {
//     const id = Number(req.params.id);

//     if (isNaN(id))
//       return res.status(400).json(respuestaError<VehiculoDto>("ID inválido"));

//     const found = await this.vehiculoQueryService.obtenerVehiculo(id);
    
//     if (!found)
//       return res.status(404).json(respuestaError<VehiculoDto>("Vehículo no encontrado"));
    
//     return res.status(200).json(respuestaOk<VehiculoDto>(found));
//   }

// }
