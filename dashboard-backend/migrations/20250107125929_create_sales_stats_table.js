/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sales_stats", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.decimal("total_revenue", 15, 2).notNullable(); // Toplam gelir
    table.decimal("average_order_value", 10, 2).notNullable(); // Ortalama sipariş değeri
    table.float("conversion_rate").notNullable(); // Dönüşüm oranı
    table.float("sales_growth").notNullable(); // Satış büyüme oranı
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sales_stats");
};
