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

describe("Product Controller Tests", () => {
  // Test veritabanını temizleme
  afterEach(async () => {
    await knex("products").truncate();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  describe("GET /api/products/list", () => {
    it("Ürün listesini döndürmeli", async () => {
      // Mock ürün ekleme
      await knex("products").insert([
        { name: "Ürün 1", category: "Kategori 1", price: 10, stock: 5 },
        { name: "Ürün 2", category: "Kategori 2", price: 20, stock: 10 },
      ]);

      const response = await request(app).get("/api/products/list");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(2);
    });
  });

  describe("POST /api/products/add", () => {
    it("Yeni ürün eklemeli", async () => {
      const newProduct = {
        name: "Yeni Ürün",
        category: "Kategori",
        price: 30,
        stock: 15,
      };

      const response = await request(app)
        .post("/api/products/add")
        .send(newProduct);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Ürün başarıyla oluşturuldu");

      const products = await knex("products").select("*");
      expect(products).toHaveLength(1);
      expect(products[0].name).toBe("Yeni Ürün");
    });
  });

  describe("PUT /api/products/edit/:id", () => {
    it("Ürünü güncellemeli", async () => {
      // Mock ürün ekleme
      const [productId] = await knex("products").insert(
        { name: "Ürün 1", category: "Kategori 1", price: 10, stock: 5 },
        ["id"]
      );

      const updatedProduct = {
        name: "Güncellenmiş Ürün",
        category: "Yeni Kategori",
        price: 40,
        stock: 20,
      };

      const response = await request(app)
        .put(`/api/products/edit/${productId}`)
        .send(updatedProduct);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Ürün başarıyla güncellendi");

      const product = await knex("products").where({ id: productId }).first();
      expect(product.name).toBe("Güncellenmiş Ürün");
    });
  });

  describe("DELETE /api/products/delete/:id", () => {
    it("Ürünü silmeli", async () => {
      // Mock ürün ekleme
      const [productId] = await knex("products").insert(
        { name: "Ürün 1", category: "Kategori 1", price: 10, stock: 5 },
        ["id"]
      );

      const response = await request(app).delete(
        `/api/products/delete/${productId}`
      );

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Ürün başarıyla silindi");

      const product = await knex("products").where({ id: productId }).first();
      expect(product).toBeUndefined();
    });
  });
});
