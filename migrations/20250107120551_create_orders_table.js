/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("order_id").notNullable(); // Sipariş ID'si
    table.string("customer").notNullable(); // Müşteri adı
    table.decimal("total", 10, 2).notNullable(); // Sipariş toplamı
    table.string("status").notNullable(); // Sipariş durumu
    table.date("date").notNullable(); // Sipariş tarihi
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("orders");
};
