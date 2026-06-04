import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../../src/app";

describe("Rate limit middleware", () => {
  it("responde 429 al superar el maximo de requests permitidos", async () => {
    let lastResponse = await request(app).get("/api/health");

    for (let attempt = 0; attempt < 10; attempt += 1) {
      lastResponse = await request(app).get("/api/health");
    }

    expect(lastResponse.status).toBe(429);
    expect(lastResponse.body.EjecucionCorrecta).toBe(false);
    expect(lastResponse.body.Dato).toBeNull();
    expect(typeof lastResponse.body.Mensaje).toBe("string");
    expect(lastResponse.body.Mensaje).toEqual(expect.stringContaining("Demasi"));
  });
});
