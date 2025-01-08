/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sales_daily", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("name").notNullable(); // Gün
    table.integer("sales").notNullable(); // Satış miktarı
    table.date("date").notNullable(); // Tarih bilgisi (günlük veri)
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sales_daily");
};
