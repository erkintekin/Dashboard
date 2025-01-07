/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("product_performance").del();

  // Yeni verileri ekleme
  await knex("product_performance").insert([
    { name: "Ürün A", sales: 4000, revenue: 2400, profit: 2400 },
    { name: "Ürün B", sales: 3000, revenue: 1398, profit: 2210 },
    { name: "Ürün C", sales: 2000, revenue: 9800, profit: 2290 },
    { name: "Ürün D", sales: 2780, revenue: 3908, profit: 2000 },
    { name: "Ürün E", sales: 1890, revenue: 4800, profit: 2181 },
  ]);
};
