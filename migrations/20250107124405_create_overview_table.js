/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("overview", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("name").notNullable(); // Veri adı
    table.string("value").notNullable(); // Değer
    table.float("change").notNullable(); // Değişim oranı (%)
    table.string("icon").notNullable(); // Kullanılan icon adı
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("overview");
};
