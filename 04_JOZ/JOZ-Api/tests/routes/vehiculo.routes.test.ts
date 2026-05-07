import express from "express";
import request from "supertest";

const crearVehiculoMock = jest.fn();
const actualizarVehiculoMock = jest.fn();
const eliminarVehiculoMock = jest.fn();
const obtenerVehiculoMock = jest.fn();

jest.mock("../../src/services/commands/vehiculos/vehiculo/vehiculo.command.service", () => ({
  VehiculoCommandService: jest.fn().mockImplementation(() => ({
    crearVehiculo: crearVehiculoMock,
    actualizarVehiculo: actualizarVehiculoMock,
    eliminarVehiculo: eliminarVehiculoMock,
  })),
}));

jest.mock("../../src/services/queries/vehiculos/vehiculo/vehiculo.query.service", () => ({
  VehiculoQueryService: jest.fn().mockImplementation(() => ({
    obtenerVehiculo: obtenerVehiculoMock,
    obtenerVehiculos: jest.fn(),
  })),
}));

import vehiculoRoutes from "../../src/routes/vehiculos/vehiculo.routes";

describe("Vehiculo routes", () => {
  const buildApp = () => {
    const app = express();
    app.use(express.json());
    app.use("/api/vehiculo", vehiculoRoutes);
    return app;
  };

  beforeEach(() => {
    crearVehiculoMock.mockReset();
    actualizarVehiculoMock.mockReset();
    eliminarVehiculoMock.mockReset();
    obtenerVehiculoMock.mockReset();
  });

  it("retorna 400 cuando el id no es válido en obtenerPorId", async () => {
    const response = await request(buildApp()).get("/api/vehiculo/obtenerPorId/abc");

    expect(obtenerVehiculoMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "ID inválido",
      Dato: null,
    });
  });

  it("retorna 400 cuando el body de creación es inválido", async () => {
    const response = await request(buildApp()).post("/api/vehiculo/crear").send({
      IdMarcaModeloVehiculo: "1",
      Ano: "2024",
    });

    expect(crearVehiculoMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body.EjecucionCorrecta).toBe(false);
    expect(response.body.Mensaje).toContain("IdMarcaModeloVehiculo debe ser número");
  });

  it("normaliza y crea el vehículo cuando el body es válido", async () => {
    crearVehiculoMock.mockResolvedValue({
      Id: 9,
      IdMarcaModeloVehiculo: 1,
      Ano: 2024,
      NumeroMotor: "ABC123",
      NumeroChasis: "XYZ987",
      Color: "Rojo",
      FechaCompra: new Date("2026-02-03T00:00:00.000Z"),
      MontoCompra: 15000000,
    });

    const response = await request(buildApp()).post("/api/vehiculo/crear").send({
      IdMarcaModeloVehiculo: 1,
      Ano: 2024,
      NumeroMotor: "  ABC123  ",
      NumeroChasis: "  XYZ987  ",
      Color: "  Rojo  ",
      FechaCompra: "03-02-2026",
      MontoCompra: 15000000,
    });

    expect(crearVehiculoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        IdMarcaModeloVehiculo: 1,
        Ano: 2024,
        NumeroMotor: "ABC123",
        NumeroChasis: "XYZ987",
        Color: "Rojo",
        MontoCompra: 15000000,
      })
    );
    expect(crearVehiculoMock.mock.calls[0][0].FechaCompra).toBeInstanceOf(Date);
    expect(response.status).toBe(201);
    expect(response.body.Dato).toMatchObject({
      Id: 9,
      Color: "Rojo",
    });
  });

  it("retorna 400 cuando el id no es válido al actualizar", async () => {
    const response = await request(buildApp())
      .patch("/api/vehiculo/actualizar/abc")
      .send({});

    expect(actualizarVehiculoMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "ID inválido",
      Dato: null,
    });
  });

  it("retorna 400 cuando el servicio informa vehículo no encontrado al eliminar", async () => {
    eliminarVehiculoMock.mockRejectedValue(new Error("Vehículo no encontrado"));

    const response = await request(buildApp()).delete("/api/vehiculo/eliminar/9");

    expect(eliminarVehiculoMock).toHaveBeenCalledWith(9);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "Vehículo no encontrado",
      Dato: null,
    });
  });
});