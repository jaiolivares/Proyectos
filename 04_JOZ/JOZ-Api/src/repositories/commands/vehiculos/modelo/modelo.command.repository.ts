import { ModeloCreateRequestDto } from "../../../../dtos/vehiculos/modelo/modeloCreateRequest.dto";
import { ModeloUpdateRequestDto } from "../../../../dtos/vehiculos/modelo/modeloUpdateRequest.dto";
import { ModeloModel } from "../../../../models/vehiculos/modelo.model";
import prisma from "../../../../prisma";

export class ModeloCommandRepository {
  public async crearModelo(req: ModeloCreateRequestDto): Promise<ModeloModel> {
    try {
      const created = await prisma.modeloVehiculo.create({
        data: {
          IdTipoVehiculo: req.IdTipoVehiculo,
          Modelo: req.Modelo,
          Descripcion: req.Descripcion,
        },
      });
      return created;
    } catch (error) {
      throw error;
    }
  }

  public async actualizarModelo(id: number, req: ModeloUpdateRequestDto): Promise<ModeloModel> {
    try {
      const data: any = {};
      if (req.IdTipoVehiculo !== undefined) data.IdTipoVehiculo = req.IdTipoVehiculo;
      if (req.Modelo !== undefined) data.Modelo = req.Modelo;
      if (req.Descripcion !== undefined) data.Descripcion = req.Descripcion;

      const updated = await prisma.modeloVehiculo.update({ where: { Id: id }, data });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  public async eliminarModelo(id: number): Promise<string> {
    try {
      await prisma.modeloVehiculo.delete({ where: { Id: id } });
      return "OK";
    } catch (error) {
      throw error;
    }
  }
}
