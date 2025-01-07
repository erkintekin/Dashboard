/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("order_stats", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.integer("total_orders").notNullable(); // Toplam siparişler
    table.integer("pending_orders").notNullable(); // Bekleyen siparişler
    table.integer("completed_orders").notNullable(); // Tamamlanan siparişler
    table.decimal("total_revenue", 10, 2).notNullable(); // Toplam gelir
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("order_stats");
};
