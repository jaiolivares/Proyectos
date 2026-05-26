import { VehiculoCreateRequestDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoCreateRequest.dto";
import { VehiculoUpdateRequestDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoUpdateRequest.dto";
import { VehiculoModel } from "../../../../models/vehiculos/vehiculo.model";
import prisma from "../../../../prisma";

export class VehiculoCommandRepository {
  public async crearVehiculo(req: VehiculoCreateRequestDto): Promise<VehiculoModel> {
    try {
      const created = await prisma.vehiculo.create({
        data: {
          IdMarcaModeloVehiculo: req.IdMarcaModeloVehiculo,
          Ano: req.Ano,
          NumeroMotor: req.NumeroMotor,
          NumeroChasis: req.NumeroChasis,
          Color: req.Color,
          FechaCompra: req.FechaCompra,
          MontoCompra: req.MontoCompra,
          Vendido: 0,
          FechaVenta: null,
          MontoVenta: null,
        },
      });
      return { ...created, Vendido: Boolean(created.Vendido) } as VehiculoModel;
    } catch (error) {
      throw error;
    }
  }

  public async actualizarVehiculo(id: number, req: VehiculoUpdateRequestDto): Promise<VehiculoModel> {
    try {
      const data: any = {};
      if (req.IdMarcaModeloVehiculo !== undefined) data.IdMarcaModeloVehiculo = req.IdMarcaModeloVehiculo;
      if (req.Ano !== undefined) data.Ano = req.Ano;
      if (req.NumeroMotor !== undefined) data.NumeroMotor = req.NumeroMotor;
      if (req.NumeroChasis !== undefined) data.NumeroChasis = req.NumeroChasis;
      if (req.Color !== undefined) data.Color = req.Color;
      if (req.FechaCompra !== undefined) data.FechaCompra = req.FechaCompra;
      if (req.MontoCompra !== undefined) data.MontoCompra = req.MontoCompra;
      if (req.Vendido !== undefined) data.Vendido = req.Vendido ? 1 : 0;
      if (req.FechaVenta !== undefined) data.FechaVenta = req.FechaVenta;
      if (req.MontoVenta !== undefined) data.MontoVenta = req.MontoVenta;

      const updated = await prisma.vehiculo.update({ where: { Id: id }, data });

      return { ...updated, Vendido: Boolean(updated.Vendido) } as VehiculoModel;
    } catch (error) {
      throw error;
    }
  }

  public async eliminarVehiculo(id: number): Promise<string> {
    try {
      await prisma.vehiculo.delete({ where: { Id: id } });
      return "OK";
    } catch (error) {
      throw error;
    }
  }
}
