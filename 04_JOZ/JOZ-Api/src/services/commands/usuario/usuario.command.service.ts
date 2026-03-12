import { Usuario } from "../../../models/usuario.model";
import { UsuarioDto } from "../../../dtos/usuario/usuario.dto";
import { UsuarioCreateRequestDto } from "../../../dtos/usuario/usuarioCreateRequest.dto";
import { UsuarioCreateResponseDto } from "../../../dtos/usuario/usuarioCreateResponse.dto";
import { UsuarioUpdateRequestDto } from "../../../dtos/usuario/usuarioUpdateRequest.dto";
import { UsuarioUpdateResponseDto } from "../../../dtos/usuario/usuarioUpdateResponse.dto";
import { UsuarioCommandRepository } from "../../../repositories/commands/usuario.command.repository";

export class UsuarioCommandService {
  private usuarioCommandRepository: UsuarioCommandRepository;

  constructor(usuarioCommandRepository?: UsuarioCommandRepository) {
    this.usuarioCommandRepository = usuarioCommandRepository ?? new UsuarioCommandRepository();
  }

  public async crearUsuario(req: UsuarioCreateRequestDto): Promise<UsuarioCreateResponseDto> {
    const created = await this.usuarioCommandRepository.crearUsuario(req);
    return created;
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
