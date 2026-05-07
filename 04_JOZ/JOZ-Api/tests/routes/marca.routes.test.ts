import express from "express";
import request from "supertest";

const crearMarcaMock = jest.fn();
const actualizarMarcaMock = jest.fn();
const eliminarMarcaMock = jest.fn();
const obtenerMarcaMock = jest.fn();
const obtenerMarcasMock = jest.fn();

jest.mock("../../src/services/commands/vehiculos/marca/marca.command.service", () => ({
  MarcaCommandService: jest.fn().mockImplementation(() => ({
    crearMarca: crearMarcaMock,
    actualizarMarca: actualizarMarcaMock,
    eliminarMarca: eliminarMarcaMock,
  })),
}));

jest.mock("../../src/services/queries/vehiculos/marca/marca.query.service", () => ({
  MarcaQueryService: jest.fn().mockImplementation(() => ({
    obtenerMarca: obtenerMarcaMock,
    obtenerMarcas: obtenerMarcasMock,
  })),
}));

import marcaRoutes from "../../src/routes/vehiculos/marca.routes";

describe("Marca routes", () => {
  const buildApp = () => {
    const app = express();
    app.use(express.json());
    app.use("/api/marca", marcaRoutes);
    return app;
  };

  beforeEach(() => {
    crearMarcaMock.mockReset();
    actualizarMarcaMock.mockReset();
    eliminarMarcaMock.mockReset();
    obtenerMarcaMock.mockReset();
    obtenerMarcasMock.mockReset();
  });

  it("retorna 404 cuando no hay marcas", async () => {
    obtenerMarcasMock.mockResolvedValue([]);

    const response = await request(buildApp()).get("/api/marca/obtenerTodos");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "No se encontraron Marcas",
      Dato: null,
    });
  });

  it("retorna 400 cuando el body de creación es inválido", async () => {
    const response = await request(buildApp()).post("/api/marca/crear").send({ Marca: "   ", Descripcion: 10 });

    expect(crearMarcaMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body.Mensaje).toContain("Marca debe ser texto y no vacío");
  });

  it("normaliza y crea una marca válida", async () => {
    crearMarcaMock.mockResolvedValue({ Id: 1, Marca: "Toyota", Descripcion: "Japon" });

    const response = await request(buildApp()).post("/api/marca/crear").send({
      Marca: "  Toyota  ",
      Descripcion: "  Japon  ",
    });

    expect(crearMarcaMock).toHaveBeenCalledWith({ Marca: "Toyota", Descripcion: "Japon" });
    expect(response.status).toBe(201);
    expect(response.body.Dato).toEqual({ Id: 1, Marca: "Toyota", Descripcion: "Japon" });
  });

  it("retorna 404 cuando la marca no existe al eliminar", async () => {
    eliminarMarcaMock.mockResolvedValue(false);

    const response = await request(buildApp()).delete("/api/marca/eliminar/9");

    expect(eliminarMarcaMock).toHaveBeenCalledWith(9);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "Marca no encontrada",
      Dato: null,
    });
  });
});