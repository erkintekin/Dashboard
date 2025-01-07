/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product_performance", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("name").notNullable(); // Ürün adı
    table.integer("sales").notNullable(); // Satış miktarı
    table.integer("revenue").notNullable(); // Gelir
    table.integer("profit").notNullable(); // Kar
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product_performance");
};
