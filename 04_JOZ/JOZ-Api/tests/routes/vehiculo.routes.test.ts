import express from "express";
import request from "supertest";

const crearVehiculoMock = jest.fn();
const actualizarVehiculoMock = jest.fn();
const eliminarVehiculoMock = jest.fn();
const obtenerVehiculoMock = jest.fn();
const obtenerVehiculosMock = jest.fn();

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
    obtenerVehiculos: obtenerVehiculosMock,
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
    obtenerVehiculosMock.mockReset();
  });

  it("retorna 200 cuando obtiene vehículos", async () => {
    obtenerVehiculosMock.mockResolvedValue([{ Id: 9, IdMarcaModeloVehiculo: 1, Ano: 2024, NumeroMotor: "ABC123", NumeroChasis: "XYZ987", Color: "Rojo", FechaCompra: new Date("2026-02-03T00:00:00.000Z"), MontoCompra: 15000000 }]);

    const response = await request(buildApp()).get("/api/vehiculo/obtenerTodos");

    expect(response.status).toBe(200);
    expect(response.body.Dato).toHaveLength(1);
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

  it("retorna 200 cuando obtiene un vehículo por id", async () => {
    obtenerVehiculoMock.mockResolvedValue({ Id: 9, IdMarcaModeloVehiculo: 1, Ano: 2024, NumeroMotor: "ABC123", NumeroChasis: "XYZ987", Color: "Rojo", FechaCompra: new Date("2026-02-03T00:00:00.000Z"), MontoCompra: 15000000 });

    const response = await request(buildApp()).get("/api/vehiculo/obtenerPorId/9");

    expect(obtenerVehiculoMock).toHaveBeenCalledWith(9);
    expect(response.status).toBe(200);
    expect(response.body.Dato).toMatchObject({ Id: 9, Color: "Rojo" });
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
      }),
    );
    expect(crearVehiculoMock.mock.calls[0][0].FechaCompra).toBeInstanceOf(Date);
    expect(response.status).toBe(201);
    expect(response.body.Dato).toMatchObject({
      Id: 9,
      Color: "Rojo",
    });
  });

  it("retorna 400 cuando el id no es válido al actualizar", async () => {
    const response = await request(buildApp()).patch("/api/vehiculo/actualizar/abc").send({});

    expect(actualizarVehiculoMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "ID inválido",
      Dato: null,
    });
  });

  it("retorna 200 cuando actualiza un vehículo existente", async () => {
    actualizarVehiculoMock.mockResolvedValue({ Id: 9, IdMarcaModeloVehiculo: 1, Ano: 2024, NumeroMotor: "ABC123", NumeroChasis: "XYZ987", Color: "Negro", FechaCompra: new Date("2026-02-03T00:00:00.000Z"), MontoCompra: 15000000 });

    const response = await request(buildApp()).patch("/api/vehiculo/actualizar/9").send({
      IdMarcaModeloVehiculo: 1,
      Ano: 2024,
      NumeroMotor: "  ABC123  ",
      NumeroChasis: "  XYZ987  ",
      Color: "  Negro  ",
      FechaCompra: "03-02-2026",
      MontoCompra: 15000000,
    });

    expect(actualizarVehiculoMock).toHaveBeenCalledWith(
      9,
      expect.objectContaining({
        IdMarcaModeloVehiculo: 1,
        Ano: 2024,
        NumeroMotor: "ABC123",
        NumeroChasis: "XYZ987",
        Color: "Negro",
        MontoCompra: 15000000,
      }),
    );
    expect(actualizarVehiculoMock.mock.calls[0][1].FechaCompra).toBeInstanceOf(Date);
    expect(response.status).toBe(200);
    expect(response.body.Dato).toMatchObject({ Id: 9, Color: "Negro" });
  });

  it("retorna 200 cuando elimina un vehículo existente", async () => {
    eliminarVehiculoMock.mockResolvedValue("OK");

    const response = await request(buildApp()).delete("/api/vehiculo/eliminar/9");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      EjecucionCorrecta: true,
      Mensaje: "",
      Dato: "OK",
    });
  });

  it("retorna 404 cuando el servicio informa vehículo no encontrado al eliminar", async () => {
    eliminarVehiculoMock.mockRejectedValue(new Error("Vehículo no encontrado"));

    const response = await request(buildApp()).delete("/api/vehiculo/eliminar/9");

    expect(eliminarVehiculoMock).toHaveBeenCalledWith(9);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "Vehículo no encontrado",
      Dato: null,
    });
  });
});
