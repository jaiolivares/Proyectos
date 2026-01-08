import { Usuario } from "../../../types/usuario";
import { UsuarioCommandRepository } from "../../../repositories/commands/usuario.command.repository";

export class UsuarioCommandService {
  private usuarioCommandRepository: UsuarioCommandRepository;

  constructor(usuarioCommandRepository?: UsuarioCommandRepository) {
    this.usuarioCommandRepository = usuarioCommandRepository ?? new UsuarioCommandRepository();
  }

  public async crearUsuario(name: string, email: string): Promise<Usuario> {
    const created = await this.usuarioCommandRepository.crearUsuario({ name, email });
    return { id: created.Id, name: created.Nombre, email: created.Email } as Usuario;
  }

  public async actualizarUsuario(id: number, name: string, email: string): Promise<Usuario | null> {
    try {
      const updated = await this.usuarioCommandRepository.actualizarUsuario(id, { name, email });
      return { id: updated.Id, name: updated.Nombre, email: updated.Email } as Usuario;
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
