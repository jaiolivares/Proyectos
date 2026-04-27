import { AuthCommandService } from "../../logins/auth/auth.command.service";
import { Usuario } from "../../../../models/usuarios/usuario.model";
import { UsuarioDto } from "../../../../dtos/usuarios/usuario/usuario.dto";
import { UsuarioCreateRequestDto } from "../../../../dtos/usuarios/usuario/usuarioCreateRequest.dto";
import { UsuarioCreateResponseDto } from "../../../../dtos/usuarios/usuario/usuarioCreateResponse.dto";
import { UsuarioUpdateRequestDto } from "../../../../dtos/usuarios/usuario/usuarioUpdateRequest.dto";
import { UsuarioUpdateResponseDto } from "../../../../dtos/usuarios/usuario/usuarioUpdateResponse.dto";
import { UsuarioCommandRepository } from "../../../../repositories/commands/usuarios/usuario/usuario.command.repository";
import { UsuarioQueryService } from "../../../queries/usuarios/usuario/usuario.query.service";

export class UsuarioCommandService {
  private authCommandService: AuthCommandService;
  private usuarioCommandRepository: UsuarioCommandRepository;
  private usuarioQueryService: UsuarioQueryService;

  constructor(usuarioCommandRepository?: UsuarioCommandRepository, usuarioQueryService?: UsuarioQueryService) {
    this.authCommandService = new AuthCommandService();
    this.usuarioCommandRepository = usuarioCommandRepository ?? new UsuarioCommandRepository();
    this.usuarioQueryService = usuarioQueryService ?? new UsuarioQueryService();
  }

  public async crearUsuario(req: UsuarioCreateRequestDto): Promise<UsuarioCreateResponseDto> {
    const passwordEncriptada = await this.authCommandService.encriptarPassword(req.Password);
    const usuarioCreateRequestDto: UsuarioCreateRequestDto = { ...req, Password: passwordEncriptada };
    
    const UsuarioModel = await this.usuarioCommandRepository.crearUsuario(usuarioCreateRequestDto);

    const responseDto: UsuarioCreateResponseDto = {
      Id: UsuarioModel.Id,
      NombreUsuario: UsuarioModel.NombreUsuario,
      Nombre: UsuarioModel.Nombre,
      SegundoNombre: UsuarioModel.SegundoNombre,
      ApellidoPaterno: UsuarioModel.ApellidoPaterno,
      ApellidoMaterno: UsuarioModel.ApellidoMaterno,
      Email: UsuarioModel.Email,
      FechaCreacion: UsuarioModel.FechaCreacion,
    };
    
    return responseDto;

  }

  public async actualizarPassword(id: number, newPassword: string): Promise<UsuarioUpdateResponseDto | null> {
    const existent = await this.usuarioQueryService.obtenerUsuario(id);
    if (!existent)
      return null;
    
    const passwordEncriptada = await this.authCommandService.encriptarPassword(newPassword);
    return await this.usuarioCommandRepository.actualizarPassword(id, passwordEncriptada);
  }

  // public async actualizarUsuario(req: UsuarioUpdateRequestDto): Promise<UsuarioUpdateResponseDto | null> {
  //   try {
  //     const updated = await this.usuarioCommandRepository.actualizarUsuario(id, { name, email });
  //     return { id: updated.Id, name: updated.Nombre, email: updated.Email } as UsuarioUpdateResponseDto;
  //   } catch (err) {
  //     return null;
  //   }
  // }

  // public async eliminarUsuario(id: number): Promise<boolean> {
  //   try {
  //     return await this.usuarioCommandRepository.eliminarUsuario(id);
  //   } catch (err) {
  //     return false;
  //   }
  // }
}
