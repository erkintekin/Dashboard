/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("revenue", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("month").notNullable(); // Ay
    table.integer("revenue").notNullable(); // Gelir miktarı
    table.integer("target").notNullable(); // Hedef gelir miktarımız (tahmini)
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("revenue");
};
