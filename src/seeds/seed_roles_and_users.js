/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("roles").del();
  await knex("users").del();

  await knex("roles").insert([
    { id: 1, name: "SuperAdmin" },
    { id: 2, name: "Admin" },
    { id: 3, name: "User" },
  ]);

  await knex("users").insert([
    {
      id: 1,
      name: "SuperAdmin",
      email: "superadmin@example.com",
      password: "hashed_password",
      role_id: 1,
    },
    {
      id: 2,
      name: "Admin",
      email: "admin@example.com",
      password: "hashed_password",
      role_id: 2,
    },
    {
      id: 3,
      name: "User",
      email: "user@example.com",
      password: "hashed_password",
      role_id: 3,
    },
  ]);
};
