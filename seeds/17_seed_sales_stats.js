/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("sales_stats").del();

  // Yeni verileri ekleme
  await knex("sales_stats").insert([
    {
      total_revenue: 1234567.0,
      average_order_value: 78.9,
      conversion_rate: 3.45,
      sales_growth: 12.3,
    },
  ]);
};
