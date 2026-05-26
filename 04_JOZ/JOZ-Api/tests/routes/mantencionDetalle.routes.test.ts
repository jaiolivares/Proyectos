import express from "express";
import request from "supertest";

const crearMantencionDetalleMock = jest.fn();
const actualizarMantencionDetalleMock = jest.fn();
const eliminarMantencionDetalleMock = jest.fn();
const obtenerMantencionDetalleMock = jest.fn();
const obtenerMantencionDetallesMock = jest.fn();

jest.mock("../../src/services/commands/vehiculos/mantencionDetalle/mantencionDetalle.command.service", () => ({
  MantencionDetalleCommandService: jest.fn().mockImplementation(() => ({
    crearMantencionDetalle: crearMantencionDetalleMock,
    actualizarMantencionDetalle: actualizarMantencionDetalleMock,
    eliminarMantencionDetalle: eliminarMantencionDetalleMock,
  })),
}));

jest.mock("../../src/services/queries/vehiculos/mantencionDetalle/mantencionDetalle.query.service", () => ({
  MantencionDetalleQueryService: jest.fn().mockImplementation(() => ({
    obtenerMantencionDetalle: obtenerMantencionDetalleMock,
    obtenerMantencionDetalles: obtenerMantencionDetallesMock,
  })),
}));

import mantencionDetalleRoutes from "../../src/routes/vehiculos/mantencionDetalle.routes";

describe("MantencionDetalle routes", () => {
  const buildApp = () => {
    const app = express();
    app.use(express.json());
    app.use("/api/mantencionDetalle", mantencionDetalleRoutes);
    return app;
  };

  beforeEach(() => {
    crearMantencionDetalleMock.mockReset();
    actualizarMantencionDetalleMock.mockReset();
    eliminarMantencionDetalleMock.mockReset();
    obtenerMantencionDetalleMock.mockReset();
    obtenerMantencionDetallesMock.mockReset();
  });

  it("retorna 404 cuando no hay detalles de mantención", async () => {
    obtenerMantencionDetallesMock.mockResolvedValue([]);

    const response = await request(buildApp()).get("/api/mantencionDetalle/obtenerTodos");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "No se encontraron detalles de mantención",
      Dato: null,
    });
  });

  it("retorna 400 cuando el id es inválido en obtenerPorId", async () => {
    const response = await request(buildApp()).get("/api/mantencionDetalle/obtenerPorId/abc");

    expect(obtenerMantencionDetalleMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "ID inválido",
      Dato: null,
    });
  });

  it("retorna 400 cuando el body de creación es inválido", async () => {
    const response = await request(buildApp()).post("/api/mantencionDetalle/crear").send({
      IdMantencion: "1",
      Producto: "",
      DetalleProducto: "",
      Monto: "10",
    });

    expect(crearMantencionDetalleMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body.Mensaje).toContain("IdMantencion debe ser número");
  });

  it("crea un detalle de mantención válido", async () => {
    crearMantencionDetalleMock.mockResolvedValue({ Id: 8, IdMantencion: 1, Producto: "Filtro", DetalleProducto: "Filtro de aceite", Monto: 12000 });

    const response = await request(buildApp()).post("/api/mantencionDetalle/crear").send({
      IdMantencion: 1,
      Producto: "  Filtro  ",
      DetalleProducto: "  Filtro de aceite  ",
      Monto: 12000,
    });

    expect(crearMantencionDetalleMock).toHaveBeenCalledWith({
      IdMantencion: 1,
      Producto: "Filtro",
      DetalleProducto: "Filtro de aceite",
      Monto: 12000,
    });
    expect(response.status).toBe(201);
    expect(response.body.Dato).toEqual({ Id: 8, IdMantencion: 1, Producto: "Filtro", DetalleProducto: "Filtro de aceite", Monto: 12000 });
  });

  it("retorna 404 cuando el detalle no existe al actualizar", async () => {
    actualizarMantencionDetalleMock.mockRejectedValue(new Error("MantencionDetalle no encontrado"));

    const response = await request(buildApp()).patch("/api/mantencionDetalle/actualizar/8").send({ Producto: "Filtro" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: "MantencionDetalle no encontrado",
      Dato: null,
    });
  });

  it("retorna 200 cuando elimina un detalle existente", async () => {
    eliminarMantencionDetalleMock.mockResolvedValue("OK");

    const response = await request(buildApp()).delete("/api/mantencionDetalle/eliminar/8");

    expect(eliminarMantencionDetalleMock).toHaveBeenCalledWith(8);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      EjecucionCorrecta: true,
      Mensaje: "",
      Dato: "OK",
    });
  });
});
