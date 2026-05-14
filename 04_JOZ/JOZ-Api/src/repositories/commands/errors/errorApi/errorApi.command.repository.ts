import { ErrorApi, ErrorApiCreate } from "../../../../models/errors/errorApi.model";
import prisma from "../../../../prisma";

export class ErrorApiCommandRepository {
  public async crearErrorApi(req: ErrorApiCreate): Promise<ErrorApi> {
    try {
      const created = await prisma.errorApi.create({
        data: {
          IdUsuario: req.IdUsuario ?? null,
          NombreError: req.NombreError,
          Mensaje: req.Mensaje,
          StackTrace: req.StackTrace ?? null,
          TokenAcceso: req.TokenAcceso ?? null,
          MetodoHttp: req.MetodoHttp,
          Endpoint: req.Endpoint,
          RequestBody: req.RequestBody ?? null,
          QueryParams: req.QueryParams ?? null,
          RouteParams: req.RouteParams ?? null,
          StatusCode: req.StatusCode ?? 500,
          ErrorControlado: req.ErrorControlado ? 1 : 0,
          FechaCreacion: new Date(),
        },
      });

      return created;
    } catch (error) {
      throw error;
    }
  }
}
