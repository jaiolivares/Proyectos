import { Request, Response } from "express";
import { AuthCommandService } from "../services/commands/auth/auth.command.service";
import { AuthQueryService } from "../services/queries/auth/auth.query.service";
import { AuthCreateRequestDto } from "../dtos/auth/authCreateRequest.dto";
import { AuthCreateResponseDto } from "../dtos/auth/authCreateResponse.dto";

export class AuthController {
  private authCommandService: AuthCommandService;
  private authQueryService: AuthQueryService;

  constructor(authCommandService: AuthCommandService, authQueryService: AuthQueryService) {
    this.authCommandService = authCommandService;
    this.authQueryService = authQueryService;
  }


  public async login(
    req: Request<{}, {}, { NombreAuth: string; Password: string }>,
    res: Response
  ): Promise<Response> {
    const { NombreAuth, Password } = req.body;
    if (!NombreAuth || !Password) return res.status(400).json({ message: 'NombreAuth y Password son obligatorios' });

    const user = await this.authQueryService.obtenerPorNombreAuth(NombreAuth);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const match = await bcrypt.compare(Password, user.Password);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    return res.status(200).json({
      Id: user.Id,
      NombreAuth: user.NombreAuth,
      Nombre: user.Nombre,
      SegundoNombre: user.SegundoNombre,
      ApellidoPaterno: user.ApellidoPaterno,
      ApellidoMaterno: user.ApellidoMaterno,
      Email: user.Email,
      FechaCreacion: user.FechaCreacion,
      FechaUltimoLogin: user.FechaUltimoLogin,
      EstaBloqueado: user.EstaBloqueado,
      EstaActivo: user.EstaActivo,
    });
  }

  // public async actualizar(req: Request, res: Response): Promise<Response> {
  //   const userId = Number(req.params.id);
  //   const { name, email } = req.body;
  //   const updatedUser = await this.authCommandService.actualizarAuth(userId, name, email);
  //   if (!updatedUser) return res.status(404).json({ message: "Auth no encontrado" });
  //   return res.status(200).json(updatedUser);
  // }

  // public async eliminar(req: Request, res: Response): Promise<Response> {
  //   const userId = Number(req.params.id);
  //   const deleted = await this.authCommandService.eliminarAuth(userId);
  //   if (!deleted) return res.status(404).json({ message: "Auth no encontrado" });
  //   return res.status(204).send();
  // }
}
