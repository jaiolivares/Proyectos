import prisma from "../../../../prisma";
import { MarcaCreateRequestDto } from "../../../../dtos/vehiculos/marca/marcaCreateRequest.dto";
import { MarcaUpdateRequestDto } from "../../../../dtos/vehiculos/marca/marcaUpdateRequest.dto";

export class MarcaCommandRepository {
  public async crearMarca(req: MarcaCreateRequestDto): Promise<any> {
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

  public async actualizarMarca(id: number, req: MarcaUpdateRequestDto): Promise<any> {
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

  public async eliminarMarca(id: number): Promise<boolean> {
    try {
      await prisma.marcaVehiculo.delete({ where: { Id: id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
