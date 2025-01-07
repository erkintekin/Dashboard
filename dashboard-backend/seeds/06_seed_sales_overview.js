/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizle
  await knex("sales_overview").del();

  // Yeni verileri ekleme
  await knex("sales_overview").insert([
    { month: "Tem", sales: 4200, year: 2023 },
    { month: "Ağu", sales: 3800, year: 2023 },
    { month: "Eyl", sales: 5100, year: 2023 },
    { month: "Eki", sales: 4600, year: 2023 },
    { month: "Kas", sales: 5400, year: 2023 },
    { month: "Ara", sales: 7200, year: 2023 },
    { month: "Oca", sales: 6100, year: 2024 },
    { month: "Şub", sales: 5900, year: 2024 },
    { month: "Mar", sales: 6800, year: 2024 },
    { month: "Nis", sales: 6300, year: 2024 },
    { month: "May", sales: 7100, year: 2024 },
    { month: "Haz", sales: 7500, year: 2024 },
  ]);
};
