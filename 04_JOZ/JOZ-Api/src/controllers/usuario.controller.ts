import { Request, Response } from "express";
import { UsuarioCommandService } from "../services/commands/usuario/usuario.command.service";
import { UsuarioQueryService } from "../services/queries/usuario/usuario.query.service";
import { UsuarioCreateRequestDto } from "../dtos/usuario/usuarioCreateRequest.dto";
import { UsuarioCreateResponseDto } from "../dtos/usuario/usuarioCreateResponse.dto";

export class UsuarioController {
  private usuarioCommandService: UsuarioCommandService;
  private usuarioQueryService: UsuarioQueryService;

  constructor(usuarioCommandService: UsuarioCommandService, usuarioQueryService: UsuarioQueryService) {
    this.usuarioCommandService = usuarioCommandService;
    this.usuarioQueryService = usuarioQueryService;
  }

  public async obtenerTodos(req: Request, res: Response): Promise<Response> {
    const users = await this.usuarioQueryService.obtenerUsuarios();
    return res.status(200).json(users);
  }

  public async obtenerPorId(req: Request, res: Response): Promise<Response> {
    const userId = Number(req.params.id);
    const user = await this.usuarioQueryService.obtenerUsuario(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    return res.status(200).json(user);
  }

  public async crear(req: Request<{}, {}, UsuarioCreateRequestDto>, res: Response<UsuarioCreateResponseDto>): Promise<Response<UsuarioCreateResponseDto>> {
    const newUser = await this.usuarioCommandService.crearUsuario(req.body);
    return res.status(201).json(newUser);
  }

  public async actualizarPassword(req: Request<{ id: string }, {}, { Password: string }>, res: Response): Promise<Response> {
    const userId = Number(req.params.id);
    const { Password } = req.body;

    if (!Password) return res.status(400).json({ message: "Password es obligatorio" });

    const result = await this.usuarioCommandService.actualizarPassword(userId, Password);
    if (!result) return res.status(404).json({ message: "Usuario no encontrado" });

    return res.status(200).json({ message: "contraseña modificada" });
  }

  // public async actualizar(req: Request, res: Response): Promise<Response> {
  //   const userId = Number(req.params.id);
  //   const { name, email } = req.body;
  //   const updatedUser = await this.usuarioCommandService.actualizarUsuario(userId, name, email);
  //   if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
  //   return res.status(200).json(updatedUser);
  // }

  // public async eliminar(req: Request, res: Response): Promise<Response> {
  //   const userId = Number(req.params.id);
  //   const deleted = await this.usuarioCommandService.eliminarUsuario(userId);
  //   if (!deleted) return res.status(404).json({ message: "Usuario no encontrado" });
  //   return res.status(204).send();
  // }
}
