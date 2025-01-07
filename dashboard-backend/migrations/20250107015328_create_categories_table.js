/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("categories", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("name").notNullable(); // Kategori adı
    table.integer("value").notNullable(); // Değer (ürün sayısı)
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("categories");
};
