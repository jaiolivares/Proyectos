import prisma from "../../../../prisma";
import { TallerCreateRequestDto } from "../../../../dtos/vehiculos/taller/tallerCreateRequest.dto";
import { TallerUpdateRequestDto } from "../../../../dtos/vehiculos/taller/tallerUpdateRequest.dto";

export class TallerCommandRepository {
  public async crearTaller(req: TallerCreateRequestDto): Promise<any> {
    try {
      const created = await prisma.taller.create({
        data: {
          Nombre: req.Nombre,
          IdComuna: req.IdComuna,
          Direccion: req.Direccion,
        },
      });
      return created;
    } catch (error) {
      throw error;
    }
  }

  public async actualizarTaller(id: number, req: TallerUpdateRequestDto): Promise<any> {
    try {
      const data: any = {};
      if (req.Nombre !== undefined) data.Nombre = req.Nombre;
      if (req.IdComuna !== undefined) data.IdComuna = req.IdComuna;
      if (req.Direccion !== undefined) data.Direccion = req.Direccion;

      const updated = await prisma.taller.update({ where: { Id: id }, data });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  public async eliminarTaller(id: number): Promise<boolean> {
    try {
      await prisma.taller.delete({ where: { Id: id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
