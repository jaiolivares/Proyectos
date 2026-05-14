import express from "express";
import request from "supertest";
import healthRoutes from "../../src/routes/healths/health.routes";

describe("Health routes", () => {
  it("responde 200 en GET /api/health", async () => {
    const app = express();
    app.use("/api/health", healthRoutes);

    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      EjecucionCorrecta: true,
      Mensaje: "",
      Dato: { status: "UP" },
    });
  });
});
