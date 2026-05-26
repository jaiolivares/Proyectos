/// <reference types="jest" />
import express from "express";
import request from "supertest";

const crearMarcaModeloVehiculoMock = jest.fn();
const actualizarMarcaModeloVehiculoMock = jest.fn();
const eliminarMarcaModeloVehiculoMock = jest.fn();
const obtenerMarcaModeloVehiculoMock = jest.fn();
const obtenerMarcaModeloVehiculosMock = jest.fn();

jest.mock("../../src/services/commands/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.command.service", () => ({
  MarcaModeloVehiculoCommandService: jest.fn().mockImplementation(() => ({
    crearMarcaModeloVehiculo: crearMarcaModeloVehiculoMock,
    actualizarMarcaModeloVehiculo: actualizarMarcaModeloVehiculoMock,
    eliminarMarcaModeloVehiculo: eliminarMarcaModeloVehiculoMock,
  })),
}));

jest.mock("../../src/services/queries/vehiculos/marcaModeloVehiculo/marcaModeloVehiculo.query.service", () => ({
  MarcaModeloVehiculoQueryService: jest.fn().mockImplementation(() => ({
    obtenerMarcaModeloVehiculo: obtenerMarcaModeloVehiculoMock,
    obtenerMarcaModeloVehiculos: obtenerMarcaModeloVehiculosMock,
  })),
}));

import marcaModeloVehiculoRoutes from "../../src/routes/vehiculos/marcaModeloVehiculo.routes";

describe("MarcaModeloVehiculo routes", () => {
  const buildApp = () => {
    const app = express();
    app.use(express.json());
    app.use("/api/marcaModeloVehiculo", marcaModeloVehiculoRoutes);
    return app;
  };

  beforeEach(() => {
    crearMarcaModeloVehiculoMock.mockReset();
    actualizarMarcaModeloVehiculoMock.mockReset();
    eliminarMarcaModeloVehiculoMock.mockReset();
    obtenerMarcaModeloVehiculoMock.mockReset();
    obtenerMarcaModeloVehiculosMock.mockReset();
  });

  it("retorna 404 cuando no hay asociaciones", async () => {
    obtenerMarcaModeloVehiculosMock.mockResolvedValue([]);

    const response = await request(buildApp()).get("/api/marcaModeloVehiculo/obtenerTodos");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "Modelos asociados a la marca no encontrados",
      Dato: null,
    });
  });

  it("retorna 400 cuando el body de creación es inválido", async () => {
    const response = await request(buildApp()).post("/api/marcaModeloVehiculo/crear").send({
      IdMarca: "1",
      IdModelo: null,
    });

    expect(crearMarcaModeloVehiculoMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body.Mensaje).toContain("IdMarca debe ser número");
  });

  it("crea una asociación válida", async () => {
    crearMarcaModeloVehiculoMock.mockResolvedValue({ Id: 10, IdMarca: 1, IdModelo: 2 });

    const response = await request(buildApp()).post("/api/marcaModeloVehiculo/crear").send({
      IdMarca: 1,
      IdModelo: 2,
    });

    expect(crearMarcaModeloVehiculoMock).toHaveBeenCalledWith({ IdMarca: 1, IdModelo: 2 });
    expect(response.status).toBe(201);
    expect(response.body.Dato).toEqual({ Id: 10, IdMarca: 1, IdModelo: 2 });
  });

  it("retorna 404 cuando la asociación no existe al actualizar", async () => {
    actualizarMarcaModeloVehiculoMock.mockRejectedValue(new Error("MarcaModeloVehiculo no encontrado"));

    const response = await request(buildApp()).patch("/api/marcaModeloVehiculo/actualizar/10").send({ IdMarca: 1, IdModelo: 2 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "MarcaModeloVehiculo no encontrado",
      Dato: null,
    });
  });
});
