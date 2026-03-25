import { Request, Response } from "express";
import { AuthCommandService } from "../services/commands/auth/auth.command.service";

export class AuthController {
  private authCommandService: AuthCommandService;
  
  constructor(authCommandService: AuthCommandService) {
    this.authCommandService = authCommandService;
  }

  public async login(req: Request<{}, {}, { NombreUsuario: string; Password: string }>, res: Response): Promise<Response> {
    const { NombreUsuario, Password } = req.body;
    if (!NombreUsuario || !Password)
      return res.status(400).json({ message: "NombreUsuario y Password son obligatorios" });

    const user = await this.authCommandService.login(NombreUsuario, Password);
    if (!user)
      return res.status(401).json({ message: "Credenciales inválidas" });
    
    return res.status(200).json({ message: "Login exitoso", user });
  }
}
