import { Request, Response } from "express";
import { respuestaOk } from "../../dtos/utils/respuesta.dto";
import type { Respuesta } from "../../dtos/utils/respuesta.dto";

export class HealthController {
  public getHealth(req: Request, res: Response<Respuesta<{ status: string }>>): Response<Respuesta<{ status: string }>> {
    return res.status(200).json(respuestaOk<{ status: string }>({ status: "UP" }));
  }
}
