const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri sil
  await knex("users").del();
  await knex("roles").del();

  // Roller
  await knex("roles").insert([
    { id: 1, name: "SuperAdmin" },
    { id: 2, name: "Admin" },
    { id: 3, name: "User" },
  ]);

  // Şifreleri hashle
  const hashedSuperAdminPassword = await bcrypt.hash("superadmin123", 10);
  const hashedAdminPassword = await bcrypt.hash("admin123", 10);
  const hashedUserPassword = await bcrypt.hash("user123", 10);

  // Kullanıcılar
  await knex("users").insert([
    {
      id: 1,
      name: "SuperAdmin",
      email: "superadmin@example.com",
      password: hashedSuperAdminPassword,
      role_id: 1,
      isActive: false,
    },
    {
      id: 2,
      name: "Admin",
      email: "admin@example.com",
      password: hashedAdminPassword,
      role_id: 2,
      isActive: false,
    },
    {
      id: 3,
      name: "User",
      email: "user@example.com",
      password: hashedUserPassword,
      role_id: 3,
      isActive: false,
    },
  ]);
};
