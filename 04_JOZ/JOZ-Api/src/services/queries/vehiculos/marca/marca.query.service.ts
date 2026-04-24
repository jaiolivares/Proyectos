import { MarcaDto } from "../../../../dtos/vehiculos/marca/marca.dto";
import { MarcaQueryRepository } from "../../../../repositories/queries/vehiculos/marca/marca.query.repository";

export class MarcaQueryService {
  private marcaQueryRepository: MarcaQueryRepository;

  constructor(marcaQueryRepository?: MarcaQueryRepository) {
    this.marcaQueryRepository = marcaQueryRepository ?? new MarcaQueryRepository();
  }

  public async obtenerMarcas(): Promise<MarcaDto[]> {
    const marcas = await this.marcaQueryRepository.obtenerMarcas();
    return marcas.map((m) => new MarcaDto(m.Id, m.Marca, m.Descripcion));
  }

  public async obtenerMarca(id: number): Promise<MarcaDto | null> {
    const marca = await this.marcaQueryRepository.obtenerMarca(id);
    if (!marca) return null;
    return new MarcaDto(marca.Id, marca.Marca, marca.Descripcion);
  }
}
