import { Request, Response } from "express";
import { respuestaOk } from "../dtos/response.dto";
import type { StandardResponse } from "../dtos/response.dto";

export class HealthController {
  public getHealth(req: Request, res: Response<StandardResponse<{ status: string }>>): Response<StandardResponse<{ status: string }>> {
    return res.status(200).json(respuestaOk<{ status: string }>({ status: "UP" }));
  }
}
