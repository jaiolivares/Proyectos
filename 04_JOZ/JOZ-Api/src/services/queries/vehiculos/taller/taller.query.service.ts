import { TallerDto } from "../../../../dtos/vehiculos/taller/taller.dto";
import { TallerQueryRepository } from "../../../../repositories/queries/vehiculos/taller/taller.query.repository";
import { ComunaQueryService } from "../../../../services/queries/ubicaciones/comuna/comuna.query.service";

export class TallerQueryService {
  private tallerQueryRepository: TallerQueryRepository;
  private comunaQueryService: ComunaQueryService;

  constructor(tallerQueryRepository?: TallerQueryRepository) {
    this.tallerQueryRepository = tallerQueryRepository ?? new TallerQueryRepository();
    this.comunaQueryService = new ComunaQueryService();
  }

  public async obtenerTalleres(): Promise<TallerDto[]> {
    const talleres = await this.tallerQueryRepository.obtenerTalleres();
    const mapped = await Promise.all(talleres.map((t) => this.mapTaller(t)));
    return mapped;
  }

  public async obtenerTaller(id: number): Promise<TallerDto | null> {
    const taller = await this.tallerQueryRepository.obtenerTaller(id);

    if (!taller) {
      return null;
    }

    return await this.mapTaller(taller);
  }

  private async mapTaller(record: any): Promise<TallerDto> {
    const comuna = record.IdComuna ? await this.comunaQueryService.obtenerComuna(record.IdComuna) : null;

    const dto: TallerDto = {
      Id: record.Id,
      Nombre: record.Nombre,
      IdComuna: record.IdComuna,
      Direccion: record.Direccion,
      Comuna: comuna ? { Codigo: comuna.Codigo, Descripcion: comuna.Descripcion } : undefined,
    };

    return dto;
  }
}
