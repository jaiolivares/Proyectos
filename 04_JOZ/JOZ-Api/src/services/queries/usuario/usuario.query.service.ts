import { UsuarioDto } from "../../../dtos/usuario.dto";
import { UsuarioQueryRepository } from "../../../repositories/queries/usuario.query.repository";

export class UsuarioQueryService {
  private usuarioQueryRepository: UsuarioQueryRepository;

  constructor(usuarioQueryRepository?: UsuarioQueryRepository) {
    this.usuarioQueryRepository = usuarioQueryRepository ?? new UsuarioQueryRepository();
  }

  public async obtenerUsuario(id: number): Promise<UsuarioDto | null> {
    const found = await this.usuarioQueryRepository.obtenerUsuario(id);
    if (!found) return null;
    return new UsuarioDto(found.Id, found.Nombre, found.ApellidoPaterno, found.Email);
  }

  public async obtenerUsuarios(): Promise<UsuarioDto[]> {
    const list = await this.usuarioQueryRepository.obtenerUsuarios();
    return list.map((u) => new UsuarioDto(u.Id, u.Nombre, u.ApellidoPaterno, u.Email));
  }
}
