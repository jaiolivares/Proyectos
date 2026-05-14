import { Request } from "express";
import jwt from "jsonwebtoken";
import config from "../../../../config";
import { ErrorApiCreate } from "../../../../models/errors/errorApi.model";
import { ErrorApiCommandRepository } from "../../../../repositories/commands/errors/errorApi/errorApi.command.repository";

export class ErrorApiCommandService {
  private errorApiCommandRepository: ErrorApiCommandRepository;

  constructor(errorApiCommandRepository?: ErrorApiCommandRepository) {
    this.errorApiCommandRepository = errorApiCommandRepository ?? new ErrorApiCommandRepository();
  }

  public async registrarError(error: unknown, req: Request, errorControlado: boolean = false): Promise<void> {
    const tokenAcceso = this.obtenerTokenAcceso(req);

    const payload: ErrorApiCreate = {
      IdUsuario: this.obtenerIdUsuario(req, tokenAcceso),
      NombreError: this.obtenerNombreError(error),
      Mensaje: this.obtenerMensajeError(error),
      StackTrace: this.obtenerStackTrace(error),
      TokenAcceso: tokenAcceso,
      MetodoHttp: req.method,
      Endpoint: req.originalUrl || req.url,
      RequestBody: this.serializar(req.body),
      QueryParams: this.serializar(req.query),
      RouteParams: this.serializar(req.params),
      StatusCode: this.obtenerStatusCode(error),
      ErrorControlado: errorControlado,
    };

    await this.errorApiCommandRepository.crearErrorApi(payload);
  }

  private obtenerTokenAcceso(req: Request): string | null {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return null;
    }

    const [scheme, token] = authorizationHeader.split(" ");
    if (scheme?.toLowerCase() !== "bearer" || !token) {
      return null;
    }

    return token;
  }

  private obtenerIdUsuario(req: Request, tokenAcceso: string | null): number | null {
    const requestWithUser = req as Request & { user?: { Id?: number; id?: number } };
    const userId = requestWithUser.user?.Id ?? requestWithUser.user?.id;
    if (typeof userId === "number" && Number.isInteger(userId)) {
      return userId;
    }

    if (!tokenAcceso) {
      return null;
    }

    try {
      const decoded = jwt.verify(tokenAcceso, config.jwt.secret as jwt.Secret) as jwt.JwtPayload & { Id?: number; id?: number };
      const tokenUserId = decoded.Id ?? decoded.id;
      return typeof tokenUserId === "number" && Number.isInteger(tokenUserId) ? tokenUserId : null;
    } catch {
      return null;
    }
  }

  private obtenerNombreError(error: unknown): string {
    if (error instanceof Error && error.name) {
      return this.recortar(error.name, 120);
    }
    return "Error";
  }

  private obtenerMensajeError(error: unknown): string {
    if (error instanceof Error && error.message) {
      return this.recortar(error.message, 500);
    }
    if (typeof error === "string" && error.trim()) {
      return this.recortar(error, 500);
    }
    return "MIDDLEWARE => Internal Server Error";
  }

  private obtenerStackTrace(error: unknown): string | null {
    if (error instanceof Error && error.stack) {
      return error.stack;
    }
    return null;
  }

  private obtenerStatusCode(error: unknown): number {
    if (typeof error === "object" && error !== null) {
      const candidate = (error as { statusCode?: number; status?: number }).statusCode ?? (error as { statusCode?: number; status?: number }).status;

      if (typeof candidate === "number" && Number.isInteger(candidate) && candidate >= 100 && candidate <= 599) {
        return candidate;
      }
    }

    return 500;
  }

  private serializar(value: unknown): string | null {
    if (value === undefined || value === null) {
      return null;
    }

    try {
      const serialized = JSON.stringify(value);
      if (!serialized || serialized === "{}" || serialized === "[]") {
        return null;
      }
      return this.recortar(serialized, 65535);
    } catch {
      return "[unserializable]";
    }
  }

  private recortar(value: string, maxLength: number): string {
    if (value.length <= maxLength) {
      return value;
    }
    return value.slice(0, maxLength);
  }
}
