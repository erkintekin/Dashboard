/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sales_overview_chart", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("month").notNullable(); // Ay
    table.integer("sales").notNullable(); // Satış miktarı
    table.date("date").notNullable(); // Tarih bilgisi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sales_overview_chart");
};
