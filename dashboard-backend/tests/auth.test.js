const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {
  it("User olarak login olma", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "superadmin@example.com", password: "hashed_password" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token"); // Testin başarılı olma koşulları, npm test ile çalıştırılır
  });
});
