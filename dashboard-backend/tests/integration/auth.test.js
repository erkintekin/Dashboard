const request = require("supertest");
const app = require("../../server");
const knex = require("../../src/config/knex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

jest.mock("../config/knex"); // Knex'i mock'lamak için
jest.mock("jsonwebtoken"); // JWT işlemleri için
jest.mock("bcrypt"); // Şifre doğrulama işlemleri için

describe("Auth Controller ve Routes", () => {
  let token;

  beforeEach(() => {
    token = jwt.sign({ id: 1, role_id: 1 }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Unit Test: login()", () => {
    it("Doğru bilgilerle login olmalı", async () => {
      const mockUser = {
        id: 1,
        email: "admin@example.com",
        password: "hashedpassword",
        role_id: 1,
      };

      knex.mockImplementation(() => ({
        where: jest.fn(() => ({
          first: jest.fn(() => mockUser),
        })),
      }));

      bcrypt.compare.mockResolvedValue(true);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "admin@example.com", password: "password" });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Başarıyla giriş yapıldı");
      expect(res.body.token).toBeDefined();
    });

    it("Yanlış bilgilerle login olmamalı", async () => {
      knex.mockImplementation(() => ({
        where: jest.fn(() => ({
          first: jest.fn(() => null),
        })),
      }));

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "wrong@example.com", password: "password" });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Kullanıcı bulunamadı");
    });
  });

  describe("Unit Test: logout()", () => {
    it("Başarıyla çıkış yapılmalı", async () => {
      knex.mockImplementation(() => ({
        where: jest.fn(() => ({
          update: jest.fn(() => 1),
        })),
      }));

      const res = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Başarıyla çıkış yapıldı");
    });
  });

  describe("Integration Test: Auth Routes", () => {
    it("POST /api/auth/login başarılı olmalı", async () => {
      const mockUser = {
        id: 1,
        email: "admin@example.com",
        password: "hashedpassword",
        role_id: 1,
      };

      knex.mockImplementation(() => ({
        where: jest.fn(() => ({
          first: jest.fn(() => mockUser),
        })),
      }));

      bcrypt.compare.mockResolvedValue(true);

      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "admin@example.com", password: "password" });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Başarıyla giriş yapıldı");
    });

    it("POST /api/auth/logout başarılı olmalı", async () => {
      knex.mockImplementation(() => ({
        where: jest.fn(() => ({
          update: jest.fn(() => 1),
        })),
      }));

      const res = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Başarıyla çıkış yapıldı");
    });
  });
});
