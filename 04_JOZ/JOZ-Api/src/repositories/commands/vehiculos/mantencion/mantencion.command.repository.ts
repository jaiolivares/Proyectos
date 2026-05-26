import { MantencionCreateRequestDto } from "../../../../dtos/vehiculos/mantencion/mantencionCreateRequest.dto";
import { MantencionUpdateRequestDto } from "../../../../dtos/vehiculos/mantencion/mantencionUpdateRequest.dto";
import { MantencionModel } from "../../../../models/vehiculos/mantencion.model";
import prisma from "../../../../prisma";

export class MantencionCommandRepository {
  public async crearMantencion(req: MantencionCreateRequestDto, idUsuario: number): Promise<MantencionModel> {
    try {
      const created = await prisma.mantencion.create({
        data: {
          IdVehiculo: req.IdVehiculo,
          Fecha: req.Fecha,
          IdTaller: req.IdTaller,
          Servicio: req.Servicio,
          MontoTotal: req.MontoTotal,
          Kilonmetraje: req.Kilometraje,
          Boleta: req.Boleta,
          IdUsuarioCreacion: idUsuario,
        },
      });
      return { ...created, IdUsuarioCreacion: idUsuario };
    } catch (error) {
      throw error;
    }
  }

  public async actualizarMantencion(id: number, req: MantencionUpdateRequestDto): Promise<MantencionModel> {
    try {
      const data: any = {};
      if (req.Fecha !== undefined) data.Fecha = req.Fecha;
      if (req.IdTaller !== undefined) data.IdTaller = req.IdTaller;
      if (req.Servicio !== undefined) data.Servicio = req.Servicio;
      if (req.MontoTotal !== undefined) data.MontoTotal = req.MontoTotal;
      if (req.Kilometraje !== undefined) data.Kilometraje = req.Kilometraje;
      if (req.Boleta !== undefined) data.Boleta = req.Boleta;

      const updated = await prisma.mantencion.update({ where: { Id: id }, data });
      return { ...updated, IdUsuarioCreacion: updated.IdUsuario };
    } catch (error) {
      throw error;
    }
  }

  public async eliminarMantencion(id: number): Promise<string> {
    try {
      await prisma.mantencion.delete({ where: { Id: id } });
      return "OK";
    } catch (error) {
      throw error;
    }
  }
}
