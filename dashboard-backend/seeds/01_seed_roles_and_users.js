/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri silme
  await knex("users").del();
  await knex("roles").del();

  // Roller
  await knex("roles").insert([
    { id: 1, name: "SuperAdmin" },
    { id: 2, name: "Admin" },
    { id: 3, name: "User" },
  ]);

  // Kullanıcılar
  await knex("users").insert([
    {
      id: 1,
      name: "SuperAdmin",
      email: "superadmin@example.com",
      password: "hashed_password",
      role_id: 1,
      isActive: false, // Varsayılan olarak false
    },
    {
      id: 2,
      name: "Admin",
      email: "admin@example.com",
      password: "hashed_password",
      role_id: 2,
      isActive: false,
    },
    {
      id: 3,
      name: "User",
      email: "user@example.com",
      password: "hashed_password",
      role_id: 3,
      isActive: false,
    },
  ]);
};
