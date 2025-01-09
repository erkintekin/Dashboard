const request = require("supertest");
const app = require("../../server");
const knex = require("../../src/config/knex");

// Middleware'leri mocklama
jest.mock("../middleware/authMiddleware", () =>
  jest.fn((req, res, next) => {
    req.user = { id: 1, role_id: 1 }; // Mock kullanıcı bilgisi
    next();
  })
);

jest.mock("../middleware/roleMiddleware", () =>
  jest.fn((req, res, next) => {
    next();
  })
);

jest.mock("../middleware/restrictToSelf", () =>
  jest.fn((req, res, next) => {
    next();
  })
);

describe("User Controller Tests", () => {
  // Test veritabanını temizleme
  afterEach(async () => {
    await knex("users").truncate();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  describe("GET /api/users", () => {
    it("Admin ve SuperAdmin için kullanıcıları listelemeli", async () => {
      // Mock kullanıcı ekleme
      await knex("users").insert([
        { name: "User 1", email: "user1@example.com", role_id: 1 },
        { name: "User 2", email: "user2@example.com", role_id: 2 },
      ]);

      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(2);
    });
  });

  describe("POST /api/users", () => {
    it("SuperAdmin yeni kullanıcı oluşturabilmeli", async () => {
      const newUser = {
        name: "Yeni Kullanıcı",
        email: "newuser@example.com",
        password: "password123",
        role_id: 2,
      };

      const response = await request(app).post("/api/users").send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Kullanıcı başarıyla oluşturuldu");

      const users = await knex("users").select("*");
      expect(users).toHaveLength(1);
      expect(users[0].name).toBe("Yeni Kullanıcı");
    });
  });

  describe("GET /api/users/:id", () => {
    it("Kullanıcı ID'ye göre bilgilerini döndürmeli", async () => {
      const [userId] = await knex("users").insert(
        { name: "User 1", email: "user1@example.com", role_id: 1 },
        ["id"]
      );

      const response = await request(app).get(`/api/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("User 1");
    });
  });

  describe("PUT /api/users/:id", () => {
    it("SuperAdmin kullanıcı bilgilerini güncelleyebilmeli", async () => {
      const [userId] = await knex("users").insert(
        { name: "User 1", email: "user1@example.com", role_id: 1 },
        ["id"]
      );

      const updatedUser = {
        name: "Güncellenmiş Kullanıcı",
        email: "updateduser@example.com",
        role_id: 2,
      };

      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send(updatedUser);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Kullanıcı başarıyla güncellendi");

      const user = await knex("users").where({ id: userId }).first();
      expect(user.name).toBe("Güncellenmiş Kullanıcı");
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("SuperAdmin kullanıcı silebilmeli", async () => {
      const [userId] = await knex("users").insert(
        { name: "User 1", email: "user1@example.com", role_id: 1 },
        ["id"]
      );

      const response = await request(app).delete(`/api/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Kullanıcı başarıyla silindi");

      const user = await knex("users").where({ id: userId }).first();
      expect(user).toBeUndefined();
    });
  });

  describe("PUT /api/users/profile", () => {
    it("Kullanıcı profilini güncelleyebilmeli", async () => {
      const [userId] = await knex("users").insert(
        { name: "User 1", email: "user1@example.com", role_id: 1 },
        ["id"]
      );

      const updatedProfile = {
        name: "Updated Profile",
        email: "updatedprofile@example.com",
      };

      const response = await request(app)
        .put("/api/users/profile")
        .send(updatedProfile);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Updated Profile");

      const user = await knex("users").where({ id: userId }).first();
      expect(user.name).toBe("Updated Profile");
    });
  });
});
