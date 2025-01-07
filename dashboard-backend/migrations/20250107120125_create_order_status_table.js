/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("order_status", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("name").notNullable(); // Sipariş durumu
    table.integer("value").notNullable(); // Durum sayısı
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("order_status");
};
