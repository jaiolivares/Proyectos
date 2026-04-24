import prisma from "../../../../prisma";
import { MarcaModeloVehiculoCreateRequestDto } from "../../../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoCreateRequest.dto";
import { MarcaModeloVehiculoUpdateRequestDto } from "../../../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoUpdateRequest.dto";

export class MarcaModeloVehiculoCommandRepository {
  public async crearMarcaModeloVehiculo(req: MarcaModeloVehiculoCreateRequestDto): Promise<any> {
    try {
      const created = await prisma.marcaModeloVehiculo.create({
        data: {
          IdMarca: req.IdMarca,
          IdModelo: req.IdModeloVehiculo,
        },
      });
      return created;
    } catch (error) {
      throw error;
    }
  }

  public async actualizarMarcaModeloVehiculo(id: number, req: MarcaModeloVehiculoUpdateRequestDto): Promise<any> {
    try {
      const data: any = {};
      if (req.IdMarca !== undefined) data.IdMarca = req.IdMarca;
      if (req.IdModeloVehiculo !== undefined) data.IdModelo = req.IdModeloVehiculo;

      const updated = await prisma.marcaModeloVehiculo.update({
        where: { Id: id },
        data,
      });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  public async eliminarMarcaModeloVehiculo(id: number): Promise<boolean> {
    try {
      await prisma.marcaModeloVehiculo.delete({ where: { Id: id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
