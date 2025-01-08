/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sales_by_category", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("name").notNullable(); // Kategori adı
    table.integer("value").notNullable(); // Satış değeri
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sales_by_category");
};
