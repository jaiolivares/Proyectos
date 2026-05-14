import { ComunaDto } from "../../../../dtos/ubicaciones/comuna/comuna.dto";
import { ComunaQueryRepository } from "../../../../repositories/queries/ubicaciones/comuna/comuna.query.repository";

export class ComunaQueryService {
  private comunaQueryRepository: ComunaQueryRepository;

  constructor(comunaQueryRepository?: ComunaQueryRepository) {
    this.comunaQueryRepository = comunaQueryRepository ?? new ComunaQueryRepository();
  }

  public async obtenerComunas(): Promise<ComunaDto[]> {
    const comunas = await this.comunaQueryRepository.obtenerComunas();
    return comunas.map((c) => new ComunaDto(c.Id, c.IdCiudad, c.Codigo, c.Descripcion));
  }

  public async obtenerComuna(id: number): Promise<ComunaDto | null> {
    const comuna = await this.comunaQueryRepository.obtenerComuna(id);

    if (!comuna) {
      return null;
    }

    return new ComunaDto(comuna.Id, comuna.IdCiudad, comuna.Codigo, comuna.Descripcion);
  }
}
