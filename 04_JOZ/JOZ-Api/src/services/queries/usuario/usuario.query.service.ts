import { User } from "../../../types";
import { UsuarioQueryRepository } from "../../../repositories/queries/usuario.query.repository";

export class UsuarioQueryService {
  private usuarioQueryRepository: UsuarioQueryRepository;

  constructor(usuarioQueryRepository?: UsuarioQueryRepository) {
    this.usuarioQueryRepository = usuarioQueryRepository ?? new UsuarioQueryRepository();
  }

  public async obtenerUsuario(id: number): Promise<User | null> {
    const found = await this.usuarioQueryRepository.obtenerUsuario(id);
    if (!found) return null;
    return { id: found.Id, name: found.Nombre, email: found.Email } as User;
  }

  public async obtenerUsuarios(): Promise<User[]> {
    const list = await this.usuarioQueryRepository.obtenerUsuarios();
    return list.map((u) => ({ id: u.Id, name: u.Nombre, email: u.Email } as User));
  }
}
