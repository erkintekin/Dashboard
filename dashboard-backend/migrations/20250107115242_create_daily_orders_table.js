/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("daily_orders", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.date("date").notNullable(); // Sipariş tarihi
    table.integer("orders").notNullable(); // Günlük sipariş sayısı
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("daily_orders");
};
