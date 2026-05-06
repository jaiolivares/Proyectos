import { TallerDto } from "../../../../dtos/vehiculos/taller/taller.dto";
import { TallerQueryRepository } from "../../../../repositories/queries/vehiculos/taller/taller.query.repository";

export class TallerQueryService {
  private tallerQueryRepository: TallerQueryRepository;

  constructor(tallerQueryRepository?: TallerQueryRepository) {
    this.tallerQueryRepository = tallerQueryRepository ?? new TallerQueryRepository();
  }

  public async obtenerTalleres(): Promise<TallerDto[]> {
    const talleres = await this.tallerQueryRepository.obtenerTalleres();
    return talleres.map((t) => new TallerDto(t.Id, t.Nombre, t.IdComuna, t.Direccion));
  }

  public async obtenerTaller(id: number): Promise<TallerDto | null> {
    const taller = await this.tallerQueryRepository.obtenerTaller(id);
    
    if (!taller)
      return null;

    return new TallerDto(
        taller.Id,
        taller.Nombre,
        taller.IdComuna,
        taller.Direccion
      );
  }
}
