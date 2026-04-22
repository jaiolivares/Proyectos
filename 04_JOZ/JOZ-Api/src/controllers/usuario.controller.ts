import { Request, Response } from "express";
import { UsuarioCommandService } from "../services/commands/usuario/usuario.command.service";
import { UsuarioQueryService } from "../services/queries/usuario/usuario.query.service";
import { UsuarioCreateRequestDto } from "../dtos/usuario/usuarioCreateRequest.dto";
import { UsuarioCreateResponseDto } from "../dtos/usuario/usuarioCreateResponse.dto";
import { respuestaOk, respuestaError } from "../dtos/utils/respuesta.dto";
import type { Respuesta } from "../dtos/utils/respuesta.dto";
import { UsuarioDto } from "../dtos/usuario/usuario.dto";

export class UsuarioController {
  private usuarioCommandService: UsuarioCommandService;
  private usuarioQueryService: UsuarioQueryService;

  constructor(usuarioCommandService: UsuarioCommandService, usuarioQueryService: UsuarioQueryService) {
    this.usuarioCommandService = usuarioCommandService;
    this.usuarioQueryService = usuarioQueryService;
  }

  public async obtenerTodos(req: Request, res: Response<Respuesta<UsuarioDto[]>>): Promise<Response<Respuesta<UsuarioDto[]>>> {
    const users = await this.usuarioQueryService.obtenerUsuarios();
    return res.status(200).json(respuestaOk<UsuarioDto[]>(users));
  }

  public async obtenerPorId(req: Request, res: Response<Respuesta<UsuarioDto>>): Promise<Response<Respuesta<UsuarioDto>>> {
    const userId = Number(req.params.id);
    const user = await this.usuarioQueryService.obtenerUsuario(userId);
    if (!user) return res.status(404).json(respuestaError<UsuarioDto>("Usuario no encontrado"));

    return res.status(200).json(respuestaOk<UsuarioDto>(user));
  }

  public async crear(req: Request<{}, {}, UsuarioCreateRequestDto>, res: Response<Respuesta<UsuarioCreateResponseDto>>): Promise<Response<Respuesta<UsuarioCreateResponseDto>>> {
    const newUser = await this.usuarioCommandService.crearUsuario(req.body);
    return res.status(201).json(respuestaOk<UsuarioCreateResponseDto>(newUser));
  }

  public async actualizarPassword(req: Request<{ id: string }, {}, { Password: string }>, res: Response<Respuesta<null>>): Promise<Response<Respuesta<null>>> {
    const userId = Number(req.params.id);
    const { Password } = req.body;

    if (!Password) return res.status(400).json(respuestaError<null>("Password es obligatorio"));

    const result = await this.usuarioCommandService.actualizarPassword(userId, Password);
    if (!result) return res.status(404).json(respuestaError<null>("Usuario no encontrado"));

    return res.status(200).json(respuestaOk<null>(null));
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
