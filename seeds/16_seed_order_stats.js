/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("order_stats").del();

  // Yeni verileri ekleme
  await knex("order_stats").insert([
    {
      total_orders: 1234,
      pending_orders: 56,
      completed_orders: 1178,
      total_revenue: 98765.0,
    },
  ]);
};
