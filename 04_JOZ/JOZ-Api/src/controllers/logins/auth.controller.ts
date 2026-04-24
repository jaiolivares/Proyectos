import { Request, Response } from "express";
import { AuthCommandService } from "../../services/commands/logins/auth/auth.command.service";
import { respuestaOk, respuestaError } from "../../dtos/utils/respuesta.dto";
import type { Respuesta } from "../../dtos/utils/respuesta.dto";
import { LoginResponseDto } from "../../dtos/login/auth/loginResponse.dto";

export class AuthController {
  private authCommandService: AuthCommandService;
  
  constructor(authCommandService: AuthCommandService) {
    this.authCommandService = authCommandService;
  }

  public async login(req: Request<{}, {}, { NombreUsuario: string; Password: string }>, res: Response<Respuesta<LoginResponseDto>>): Promise<Response<Respuesta<LoginResponseDto>>> {
    const { NombreUsuario, Password } = req.body;
    if (!NombreUsuario || !Password)
      return res.status(400).json(respuestaError<LoginResponseDto>("NombreUsuario y Password son obligatorios"));

    const result = await this.authCommandService.login(NombreUsuario, Password);
    if (!result)
      return res.status(401).json(respuestaError<LoginResponseDto>("Credenciales inválidas"));

    return res.status(200).json(respuestaOk<LoginResponseDto>(result, "Login exitoso"));
  }
}
