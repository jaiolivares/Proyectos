import { AuthCommandService } from "../auth/auth.command.service";
import { Usuario } from "../../../models/usuario.model";
import { UsuarioDto } from "../../../dtos/usuario/usuario.dto";
import { UsuarioCreateRequestDto } from "../../../dtos/usuario/usuarioCreateRequest.dto";
import { UsuarioCreateResponseDto } from "../../../dtos/usuario/usuarioCreateResponse.dto";
import { UsuarioUpdateRequestDto } from "../../../dtos/usuario/usuarioUpdateRequest.dto";
import { UsuarioUpdateResponseDto } from "../../../dtos/usuario/usuarioUpdateResponse.dto";
import { UsuarioCommandRepository } from "../../../repositories/commands/usuario.command.repository";
import { UsuarioQueryService } from "../../queries/usuario/usuario.query.service";

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
    return await this.usuarioCommandRepository.crearUsuario(usuarioCreateRequestDto);
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
