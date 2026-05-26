import express from "express";
import request from "supertest";

const crearMantencionMock = jest.fn();
const actualizarMantencionMock = jest.fn();
const eliminarMantencionMock = jest.fn();
const obtenerMantencionMock = jest.fn();
const obtenerMantencionesMock = jest.fn();

jest.mock("../../src/services/commands/vehiculos/mantencion/mantencion.command.service", () => ({
  MantencionCommandService: jest.fn().mockImplementation(() => ({
    crearMantencion: crearMantencionMock,
    actualizarMantencion: actualizarMantencionMock,
    eliminarMantencion: eliminarMantencionMock,
  })),
}));

jest.mock("../../src/services/queries/vehiculos/mantencion/mantencion.query.service", () => ({
  MantencionQueryService: jest.fn().mockImplementation(() => ({
    obtenerMantencion: obtenerMantencionMock,
    obtenerMantenciones: obtenerMantencionesMock,
  })),
}));

import mantencionRoutes from "../../src/routes/vehiculos/mantencion.routes";

describe("Mantencion routes", () => {
  const buildApp = (idUsuario?: number) => {
    const app = express();
    app.use(express.json());
    if (idUsuario !== undefined) {
      app.use((_, res, next) => {
        res.locals.auth = { Id: idUsuario };
        next();
      });
    }
    app.use("/api/mantencion", mantencionRoutes);
    return app;
  };

  beforeEach(() => {
    crearMantencionMock.mockReset();
    actualizarMantencionMock.mockReset();
    eliminarMantencionMock.mockReset();
    obtenerMantencionMock.mockReset();
    obtenerMantencionesMock.mockReset();
  });

  it("retorna 404 cuando no hay mantenciones", async () => {
    obtenerMantencionesMock.mockResolvedValue([]);

    const response = await request(buildApp()).get("/api/mantencion/obtenerTodos");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "No se encontraron mantenciones",
      Dato: null,
    });
  });

  it("retorna 400 cuando el id es inválido en obtenerPorId", async () => {
    const response = await request(buildApp()).get("/api/mantencion/obtenerPorId/abc");

    expect(obtenerMantencionMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "ID inválido",
      Dato: null,
    });
  });

  it("retorna 401 cuando no hay usuario autenticado al crear", async () => {
    const response = await request(buildApp()).post("/api/mantencion/crear").send({
      IdVehiculo: 1,
      Fecha: "03-02-2026",
      IdTaller: 2,
      Servicio: "Cambio de aceite",
      MontoTotal: 10000,
      IdUsuario: 7,
    });

    expect(crearMantencionMock).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "IdUsuario no presente en token",
      Dato: null,
    });
  });

  it("crea una mantención válida", async () => {
    crearMantencionMock.mockResolvedValue({
      Id: 5,
      IdVehiculo: 1,
      Fecha: new Date("2026-02-03T00:00:00.000Z"),
      IdTaller: 2,
      Servicio: "Cambio de aceite",
      MontoTotal: 10000,
      IdUsuarioCreacion: 7,
    });

    const response = await request(buildApp(7)).post("/api/mantencion/crear").send({
      IdVehiculo: 1,
      Fecha: "03-02-2026",
      IdTaller: 2,
      Servicio: "  Cambio de aceite  ",
      MontoTotal: 10000,
      IdUsuario: 99,
    });

    expect(crearMantencionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        IdVehiculo: 1,
        IdTaller: 2,
        Servicio: "Cambio de aceite",
        MontoTotal: 10000,
        IdUsuario: 99,
      }),
      7,
    );
    expect(crearMantencionMock.mock.calls[0][0].Fecha).toBeInstanceOf(Date);
    expect(response.status).toBe(201);
    expect(response.body.Dato).toMatchObject({ Id: 5, Servicio: "Cambio de aceite" });
  });

  it("retorna 404 cuando la mantención no existe al actualizar", async () => {
    actualizarMantencionMock.mockRejectedValue(new Error("Mantención no encontrada"));

    const response = await request(buildApp()).patch("/api/mantencion/actualizar/5").send({ Servicio: "Alineacion" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "Mantención no encontrada",
      Dato: null,
    });
  });

  it("retorna 200 cuando elimina una mantención existente", async () => {
    eliminarMantencionMock.mockResolvedValue("OK");

    const response = await request(buildApp()).delete("/api/mantencion/eliminar/5");

    expect(eliminarMantencionMock).toHaveBeenCalledWith(5);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      EjecucionCorrecta: true,
      Mensaje: "",
      Dato: "OK",
    });
  });
});
