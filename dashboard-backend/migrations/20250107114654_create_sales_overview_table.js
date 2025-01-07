/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sales_overview", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("month").notNullable(); // Ay ismi
    table.integer("sales").notNullable(); // Satış miktarı
    table.integer("year").notNullable(); // Yıl bilgisi
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sales_overview");
};
