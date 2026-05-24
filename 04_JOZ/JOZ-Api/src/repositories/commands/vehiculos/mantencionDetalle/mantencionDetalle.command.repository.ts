import { MantencionDetalleCreateRequestDto } from "../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalleCreateRequest.dto";
import { MantencionDetalleUpdateRequestDto } from "../../../../dtos/vehiculos/mantencionDetalle/mantencionDetalleUpdateRequest.dto";
import { MantencionDetalleModel } from "../../../../models/vehiculos/mantencionDetalle.model";
import prisma from "../../../../prisma";

export class MantencionDetalleCommandRepository {
  public async crearMantencionDetalle(req: MantencionDetalleCreateRequestDto): Promise<MantencionDetalleModel> {
    try {
      const created = await prisma.mantenciondetalle.create({
        data: {
          IdMantencion: req.IdMantencion,
          Producto: req.Producto,
          DetalleProducto: req.DetalleProducto,
          Monto: req.Monto,
        },
      });
      return created;
    } catch (error) {
      throw error;
    }
  }

  public async actualizarMantencionDetalle(id: number, req: MantencionDetalleUpdateRequestDto): Promise<MantencionDetalleModel> {
    try {
      const data: any = {};
      if (req.Producto !== undefined) data.Producto = req.Producto;
      if (req.DetalleProducto !== undefined) data.DetalleProducto = req.DetalleProducto;
      if (req.Monto !== undefined) data.Monto = req.Monto;

      const updated = await prisma.mantenciondetalle.update({ where: { Id: id }, data });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  public async eliminarMantencionDetalle(id: number): Promise<string> {
    try {
      await prisma.mantenciondetalle.delete({ where: { Id: id } });
      return "OK";
    } catch (error) {
      throw error;
    }
  }
}
