/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("sales_daily").del();

  // Yeni verileri ekleme
  await knex("sales_daily").insert([
    { name: "Pzt", sales: 1000, date: "2025-01-01" },
    { name: "Sal", sales: 1200, date: "2025-01-02" },
    { name: "Çar", sales: 900, date: "2025-01-03" },
    { name: "Per", sales: 1100, date: "2025-01-04" },
    { name: "Cum", sales: 1300, date: "2025-01-05" },
    { name: "Cmt", sales: 1600, date: "2025-01-06" },
    { name: "Paz", sales: 1400, date: "2025-01-07" },
  ]);
};
