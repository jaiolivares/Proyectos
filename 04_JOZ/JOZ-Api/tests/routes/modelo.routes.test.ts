import express from "express";
import request from "supertest";

const crearModeloMock = jest.fn();
const actualizarModeloMock = jest.fn();
const eliminarModeloMock = jest.fn();
const obtenerModeloMock = jest.fn();
const obtenerModelosMock = jest.fn();

jest.mock("../../src/services/commands/vehiculos/modelo/modelo.command.service", () => ({
  ModeloCommandService: jest.fn().mockImplementation(() => ({
    crearModelo: crearModeloMock,
    actualizarModelo: actualizarModeloMock,
    eliminarModelo: eliminarModeloMock,
  })),
}));

jest.mock("../../src/services/queries/vehiculos/modelo/modelo.query.service", () => ({
  ModeloQueryService: jest.fn().mockImplementation(() => ({
    obtenerModelo: obtenerModeloMock,
    obtenerModelos: obtenerModelosMock,
  })),
}));

import modeloRoutes from "../../src/routes/vehiculos/modelo.routes";

describe("Modelo routes", () => {
  const buildApp = () => {
    const app = express();
    app.use(express.json());
    app.use("/api/modelo", modeloRoutes);
    return app;
  };

  beforeEach(() => {
    crearModeloMock.mockReset();
    actualizarModeloMock.mockReset();
    eliminarModeloMock.mockReset();
    obtenerModeloMock.mockReset();
    obtenerModelosMock.mockReset();
  });

  it("retorna 400 cuando el id es inválido", async () => {
    const response = await request(buildApp()).get("/api/modelo/obtenerPorId/abc");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "ID inválido",
      Dato: null,
    });
  });

  it("retorna 400 cuando el body de creación es inválido", async () => {
    const response = await request(buildApp()).post("/api/modelo/crear").send({
      IdTipoVehiculo: "1",
      Modelo: "   ",
      Descripcion: 25,
    });

    expect(crearModeloMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body.Mensaje).toContain("IdTipoVehiculo debe ser número");
  });

  it("crea un modelo válido", async () => {
    crearModeloMock.mockResolvedValue({ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });

    const response = await request(buildApp()).post("/api/modelo/crear").send({
      IdTipoVehiculo: 1,
      Modelo: "  Yaris  ",
      Descripcion: "  Sedan  ",
    });

    expect(crearModeloMock).toHaveBeenCalledWith({ IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });
    expect(response.status).toBe(201);
    expect(response.body.Dato).toEqual({ Id: 2, IdTipoVehiculo: 1, Modelo: "Yaris", Descripcion: "Sedan" });
  });

  it("retorna 404 cuando el modelo no existe al eliminar", async () => {
    eliminarModeloMock.mockResolvedValue(false);

    const response = await request(buildApp()).delete("/api/modelo/eliminar/7");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "Modelo no encontrado",
      Dato: null,
    });
  });
});
