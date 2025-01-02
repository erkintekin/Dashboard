/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
    })
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE");
    })
    .createTable("content", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("body").notNullable();
      table
        .integer("created_by")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("content")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
