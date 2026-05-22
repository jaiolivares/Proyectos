import { MarcaCreateRequestDto } from "../../../../dtos/vehiculos/marca/marcaCreateRequest.dto";
import { MarcaUpdateRequestDto } from "../../../../dtos/vehiculos/marca/marcaUpdateRequest.dto";
import { MarcaModel } from "../../../../models/vehiculos/marca.model";
import prisma from "../../../../prisma";

export class MarcaCommandRepository {
  public async crearMarca(req: MarcaCreateRequestDto): Promise<MarcaModel> {
    try {
      const created = await prisma.marcaVehiculo.create({
        data: {
          Marca: req.Marca,
          Descripcion: req.Descripcion,
        },
      });
      return created;
    } catch (error) {
      throw error;
    }
  }

  public async actualizarMarca(id: number, req: MarcaUpdateRequestDto): Promise<MarcaModel> {
    try {
      const data: any = {};
      if (req.Marca !== undefined) data.Marca = req.Marca;
      if (req.Descripcion !== undefined) data.Descripcion = req.Descripcion;

      const updated = await prisma.marcaVehiculo.update({ where: { Id: id }, data });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  public async eliminarMarca(id: number): Promise<string> {
    try {
      await prisma.marcaVehiculo.delete({ where: { Id: id } });
      return "OK";
    } catch (error) {
      throw error;
    }
  }
}
