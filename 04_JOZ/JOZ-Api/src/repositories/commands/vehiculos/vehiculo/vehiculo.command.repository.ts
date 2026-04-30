import prisma from "../../../../prisma";
import { VehiculoCreateRequestDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoCreateRequest.dto";
import { VehiculoUpdateRequestDto } from "../../../../dtos/vehiculos/vehiculo/vehiculoUpdateRequest.dto";
import { Vehiculo } from "../../../../models/vehiculos/vehiculo.model";

export class VehiculoCommandRepository {
  public async crearVehiculo(req: VehiculoCreateRequestDto): Promise<Vehiculo> {
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
      return created;
    } catch (error) {
      throw error;
    }
  }

  public async actualizarVehiculo(id: number, req: VehiculoUpdateRequestDto): Promise<Vehiculo> {
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

      const updated = await prisma.vehiculo.update({
        where: { Id: id },
        data,
      });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  public async eliminarVehiculo(id: number): Promise<boolean> {
    try {
      await prisma.vehiculo.delete({ where: { Id: id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
