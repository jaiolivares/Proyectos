import { UsuarioDto } from "../../../dtos/usuario/usuario.dto";
import { UsuarioQueryRepository } from "../../../repositories/queries/usuario.query.repository";

export class UsuarioQueryService {
  private usuarioQueryRepository: UsuarioQueryRepository;

  constructor(usuarioQueryRepository?: UsuarioQueryRepository) {
    this.usuarioQueryRepository = usuarioQueryRepository ?? new UsuarioQueryRepository();
  }

  public async obtenerUsuario(id: number): Promise<UsuarioDto | null> {
    const found = await this.usuarioQueryRepository.obtenerUsuario(id);
    if (!found) return null;

    return new UsuarioDto(
      found.Id,
      found.NombreUsuario,
      found.Password,
      found.Nombre,
      found.SegundoNombre,
      found.ApellidoPaterno,
      found.ApellidoMaterno,
      found.Email,
      found.FechaCreacion,
      found.FechaUltimoLogin ?? null,
      found.EstaBloqueado,
      found.EstaActivo
    );
  }

  public async obtenerPorNombreUsuario(nombreUsuario: string): Promise<UsuarioDto | null> {
    const found = await this.usuarioQueryRepository.obtenerPorNombreUsuario(nombreUsuario);
    if (!found) return null;

    return new UsuarioDto(
      found.Id,
      found.NombreUsuario,
      found.Password,
      found.Nombre,
      found.SegundoNombre,
      found.ApellidoPaterno,
      found.ApellidoMaterno,
      found.Email,
      found.FechaCreacion,
      found.FechaUltimoLogin ?? null,
      found.EstaBloqueado,
      found.EstaActivo
    );
  }

  public async obtenerUsuarios(): Promise<UsuarioDto[]> {
    const list = await this.usuarioQueryRepository.obtenerUsuarios();
    return list.map((u) => new UsuarioDto(u.Id, u.NombreUsuario, u.Password, u.Nombre, u.SegundoNombre, u.ApellidoPaterno, u.ApellidoMaterno, u.Email, u.FechaCreacion, u.FechaUltimoLogin ?? null, u.EstaBloqueado, u.EstaActivo));
  }
}
