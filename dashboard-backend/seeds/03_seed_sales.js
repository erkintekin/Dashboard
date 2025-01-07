/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Mevcut veri varsa temizle
  await knex("sales").del();

  // Verileri ekleme
  await knex("sales").insert([
    { month: "Oca", sales: 4000, year: 2023 },
    { month: "Şub", sales: 3000, year: 2023 },
    { month: "Mar", sales: 5000, year: 2023 },
    { month: "Nis", sales: 4500, year: 2023 },
    { month: "May", sales: 6000, year: 2023 },
    { month: "Haz", sales: 5500, year: 2023 },
  ]);
};
