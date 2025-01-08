/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("sales_overview_chart").del();

  // Yeni verileri ekleme
  await knex("sales_overview_chart").insert([
    { month: "Oca", sales: 4000, date: "2025-01-01" },
    { month: "Şub", sales: 3000, date: "2025-02-01" },
    { month: "Mar", sales: 5000, date: "2025-03-01" },
    { month: "Nis", sales: 4500, date: "2025-04-01" },
    { month: "May", sales: 6000, date: "2025-05-01" },
    { month: "Haz", sales: 5500, date: "2025-06-01" },
    { month: "Tem", sales: 7000, date: "2025-07-01" },
  ]);
};
