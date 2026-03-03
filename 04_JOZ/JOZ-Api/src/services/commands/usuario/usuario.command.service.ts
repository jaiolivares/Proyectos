import { Usuario } from "../../../models/usuario.model";
import { UsuarioDto } from "../../../dtos/usuario/usuario.dto";
import { UsuarioCreateRequestDto } from "../../../dtos/usuario/usuarioCreateRequest.dto";
import { UsuarioCreateResponseDto } from "../../../dtos/usuario/usuarioCreateResponse.dto";
import { UsuarioUpdateDto } from "../../../dtos/usuario/usuarioUpdateRequest.dto";
import { UsuarioCommandRepository } from "../../../repositories/commands/usuario.command.repository";

export class UsuarioCommandService {
  private usuarioCommandRepository: UsuarioCommandRepository;

  constructor(usuarioCommandRepository?: UsuarioCommandRepository) {
    this.usuarioCommandRepository = usuarioCommandRepository ?? new UsuarioCommandRepository();
  }

  public async crearUsuario(req: UsuarioCreateRequestDto): Promise<UsuarioCreateResponseDto> {
    const created = await this.usuarioCommandRepository.crearUsuario({ name, email });
    return { id: created.Id, name: created.Nombre, email: created.Email } as UsuarioCreateDto;
  }

  public async actualizarUsuario(id: number, name: string, email: string): Promise<UsuarioUpdateDto | null> {
    try {
      const updated = await this.usuarioCommandRepository.actualizarUsuario(id, { name, email });
      return { id: updated.Id, name: updated.Nombre, email: updated.Email } as UsuarioUpdateDto;
    } catch (err) {
      return null;
    }
  }

  public async eliminarUsuario(id: number): Promise<boolean> {
    try {
      return await this.usuarioCommandRepository.eliminarUsuario(id);
    } catch (err) {
      return false;
    }
  }
}
