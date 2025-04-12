const request = require("supertest");
const server = require("../index.js");
const { generateToken } = require("../utils/login.js");

const { faker } = require("@faker-js/faker");

describe("Operaciones CRUD de cafes", () => {
  describe("GET /cafes", () => {
    it("debería responder con status 200 y un arreglo con al menos 1 objeto", async () => {
      const response = await request(server).get("/cafes");

      expect(response.status).toBe(200);

      expect(Array.isArray(response.body)).toBe(true);

      expect(response.body.length).toBeGreaterThan(0);

      expect(typeof response.body[0]).toBe("object");
    });
  });

  describe("DELETE /cafes/:id", () => {
    const token = generateToken();
    it("debería responder con status 404 si el id no existe", async () => {
      const idInexistente = 999;
      const response = await request(server)
        .delete(`/cafes/${idInexistente}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "No se encontró ningún café con ese id",
      });
    });
  });

  describe("POST /api/travels create travels with valid params", () => {
    const payload = {
      id: 5,
      nombre: "Cafe colombiano",
    };
    it("return 201 ", async () => {
      const response = await request(server).post("/cafes").send(payload);
      expect(response.statusCode).toBe(201);
    });
  });

  describe("Put /cafes/:id", () => {
    it("debería responder con status 400 si el id no existe", async () => {
      const idInexistente = 999;
      const payload = {
        nombre: "Cafe turco",
      };

      const response = await request(server)
        .put(`/cafes/${idInexistente}`)
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "El id del parámetro no coincide con el id del café recibido",
      });
    });
  });
});
