import { Request, Response } from "express";
import { UsuarioCommandService } from "../services/commands/usuario/usuario.command.service";
import { UsuarioQueryService } from "../services/queries/usuario/usuario.query.service";
import { UsuarioCreateRequestDto } from "../dtos/usuario/usuarioCreateRequest.dto";
import { UsuarioCreateResponseDto } from "../dtos/usuario/usuarioCreateResponse.dto";

export class UsuariosController {
  private usuarioCommandService: UsuarioCommandService;
  private usuarioQueryService: UsuarioQueryService;

  constructor(usuarioCommandService: UsuarioCommandService, usuarioQueryService: UsuarioQueryService) {
    this.usuarioCommandService = usuarioCommandService;
    this.usuarioQueryService = usuarioQueryService;
  }

  public async obtenerPorId(req: Request, res: Response): Promise<Response> {
    const userId = Number(req.params.id);
    const user = await this.usuarioQueryService.obtenerUsuario(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    return res.status(200).json(user);
  }

  public async obtenerTodos(req: Request, res: Response): Promise<Response> {
    const users = await this.usuarioQueryService.obtenerUsuarios();
    return res.status(200).json(users);
  }

  public async crear(
    req: Request<{}, {}, UsuarioCreateRequestDto>,
    res: Response<UsuarioCreateResponseDto>): Promise<Response<UsuarioCreateResponseDto>> {
    const newUser = await this.usuarioCommandService.crearUsuario(req.body);
    return res.status(201).json(newUser);
  }

  public async actualizarPassword(
    req: Request<{ id: string }, {}, { Password: string }>,
    res: Response): Promise<Response> {
    const userId = Number(req.params.id);
    const { Password } = req.body;
    if (!Password)
      return res.status(400).json({ message: 'Password es obligatorio' });
    
    const updatedUser = await this.usuarioCommandService.actualizarPassword(userId, Password);
    if (!updatedUser)
      return res.status(404).json({ message: "Usuario no encontrado" });
    
    return res.status(200).json(updatedUser);
  }


  // public async login(
  //   req: Request<{}, {}, { NombreUsuario: string; Password: string }>,
  //   res: Response
  // ): Promise<Response> {
  //   const { NombreUsuario, Password } = req.body;
  //   if (!NombreUsuario || !Password) return res.status(400).json({ message: 'NombreUsuario y Password son obligatorios' });

  //   const user = await this.usuarioQueryService.obtenerPorNombreUsuario(NombreUsuario);
  //   if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

  //   const match = await bcrypt.compare(Password, user.Password);
  //   if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

  //   return res.status(200).json({
  //     Id: user.Id,
  //     NombreUsuario: user.NombreUsuario,
  //     Nombre: user.Nombre,
  //     SegundoNombre: user.SegundoNombre,
  //     ApellidoPaterno: user.ApellidoPaterno,
  //     ApellidoMaterno: user.ApellidoMaterno,
  //     Email: user.Email,
  //     FechaCreacion: user.FechaCreacion,
  //     FechaUltimoLogin: user.FechaUltimoLogin,
  //     EstaBloqueado: user.EstaBloqueado,
  //     EstaActivo: user.EstaActivo,
  //   });
  // }

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
