/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cart", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.integer("product_id").unsigned().notNullable();
    table.integer("quantity").unsigned().notNullable();

    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.foreign("product_id").references("products.id").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cart");
};
