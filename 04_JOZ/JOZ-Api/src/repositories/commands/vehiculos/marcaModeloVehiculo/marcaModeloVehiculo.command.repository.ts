import { MarcaModeloVehiculoCreateRequestDto } from "../../../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoCreateRequest.dto";
import { MarcaModeloVehiculoUpdateRequestDto } from "../../../../dtos/vehiculos/marcaModeloVehiculo/marcaModeloVehiculoUpdateRequest.dto";
import { MarcaModeloVehiculoModel } from "../../../../models/vehiculos/marcaModeloVehiculo.model";
import prisma from "../../../../prisma";

export class MarcaModeloVehiculoCommandRepository {
  public async crearMarcaModeloVehiculo(req: MarcaModeloVehiculoCreateRequestDto): Promise<MarcaModeloVehiculoModel> {
    try {
      const created = await prisma.marcaModeloVehiculo.create({
        data: {
          IdMarca: req.IdMarca,
          IdModelo: req.IdModelo,
        },
      });
      return created;
    } catch (error) {
      throw error;
    }
  }

  public async actualizarMarcaModeloVehiculo(id: number, req: MarcaModeloVehiculoUpdateRequestDto): Promise<MarcaModeloVehiculoModel> {
    try {
      const data: any = {};
      if (req.IdMarca !== undefined) data.IdMarca = req.IdMarca;
      if (req.IdModelo !== undefined) data.IdModelo = req.IdModelo;

      const updated = await prisma.marcaModeloVehiculo.update({ where: { Id: id }, data });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  public async eliminarMarcaModeloVehiculo(id: number): Promise<string> {
    try {
      await prisma.marcaModeloVehiculo.delete({ where: { Id: id } });
      return "OK";
    } catch (error) {
      throw error;
    }
  }
}
