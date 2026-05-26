import express from "express";
import request from "supertest";

const crearTallerMock = jest.fn();
const actualizarTallerMock = jest.fn();
const eliminarTallerMock = jest.fn();
const obtenerTallerMock = jest.fn();
const obtenerTalleresMock = jest.fn();

jest.mock("../../src/services/commands/vehiculos/taller/taller.command.service", () => ({
  TallerCommandService: jest.fn().mockImplementation(() => ({
    crearTaller: crearTallerMock,
    actualizarTaller: actualizarTallerMock,
    eliminarTaller: eliminarTallerMock,
  })),
}));

jest.mock("../../src/services/queries/vehiculos/taller/taller.query.service", () => ({
  TallerQueryService: jest.fn().mockImplementation(() => ({
    obtenerTaller: obtenerTallerMock,
    obtenerTalleres: obtenerTalleresMock,
  })),
}));

import tallerRoutes from "../../src/routes/vehiculos/taller.routes";

describe("Taller routes", () => {
  const buildApp = () => {
    const app = express();
    app.use(express.json());
    app.use("/api/taller", tallerRoutes);
    return app;
  };

  beforeEach(() => {
    crearTallerMock.mockReset();
    actualizarTallerMock.mockReset();
    eliminarTallerMock.mockReset();
    obtenerTallerMock.mockReset();
    obtenerTalleresMock.mockReset();
  });

  it("retorna 400 cuando el body de creación es inválido", async () => {
    const response = await request(buildApp()).post("/api/taller/crear").send({
      Nombre: "",
      IdComuna: "1",
      Direccion: "",
    });

    expect(crearTallerMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body.Mensaje).toContain("Nombre debe ser texto y no vacío");
  });

  it("retorna 200 cuando obtiene talleres", async () => {
    obtenerTalleresMock.mockResolvedValue([{ Id: 8, Nombre: "Centro", IdComuna: 1, Direccion: "Av. Central 100" }]);

    const response = await request(buildApp()).get("/api/taller/obtenerTodos");

    expect(response.status).toBe(200);
    expect(response.body.Dato).toEqual([{ Id: 8, Nombre: "Centro", IdComuna: 1, Direccion: "Av. Central 100" }]);
  });

  it("retorna 200 cuando obtiene un taller por id", async () => {
    obtenerTallerMock.mockResolvedValue({ Id: 8, Nombre: "Centro", IdComuna: 1, Direccion: "Av. Central 100" });

    const response = await request(buildApp()).get("/api/taller/obtenerPorId/8");

    expect(obtenerTallerMock).toHaveBeenCalledWith(8);
    expect(response.status).toBe(200);
    expect(response.body.Dato).toEqual({ Id: 8, Nombre: "Centro", IdComuna: 1, Direccion: "Av. Central 100" });
  });

  it("retorna 404 cuando el servicio rechaza IdComuna", async () => {
    crearTallerMock.mockRejectedValue(new Error("IdComuna no es válido"));

    const response = await request(buildApp()).post("/api/taller/crear").send({
      Nombre: "  Taller Norte  ",
      IdComuna: 4,
      Direccion: "  Av. Siempre Viva 123  ",
    });

    expect(crearTallerMock).toHaveBeenCalledWith({
      Nombre: "Taller Norte",
      IdComuna: 4,
      Direccion: "Av. Siempre Viva 123",
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "IdComuna no es válido",
      Dato: null,
    });
  });

  it("retorna 404 cuando el taller no existe al actualizar", async () => {
    actualizarTallerMock.mockRejectedValue(new Error("Taller no encontrado"));

    const response = await request(buildApp()).patch("/api/taller/actualizar/8").send({ Nombre: "Centro", IdComuna: 1, Direccion: "Av. Central 100" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "Taller no encontrado",
      Dato: null,
    });
  });

  it("retorna 200 cuando actualiza un taller existente", async () => {
    actualizarTallerMock.mockResolvedValue({ Id: 8, Nombre: "Centro", IdComuna: 1, Direccion: "Av. Central 100" });

    const response = await request(buildApp()).patch("/api/taller/actualizar/8").send({
      Nombre: "  Centro  ",
      IdComuna: 1,
      Direccion: "  Av. Central 100  ",
    });

    expect(actualizarTallerMock).toHaveBeenCalledWith(8, { Nombre: "Centro", IdComuna: 1, Direccion: "Av. Central 100" });
    expect(response.status).toBe(200);
    expect(response.body.Dato).toEqual({ Id: 8, Nombre: "Centro", IdComuna: 1, Direccion: "Av. Central 100" });
  });

  it("retorna 200 cuando elimina un taller existente", async () => {
    eliminarTallerMock.mockResolvedValue("Taller eliminado correctamente");

    const response = await request(buildApp()).delete("/api/taller/eliminar/8");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      EjecucionCorrecta: true,
      Mensaje: "",
      Dato: "Taller eliminado correctamente",
    });
  });
});
