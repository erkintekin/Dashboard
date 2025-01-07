/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("revenue").del();

  // Yeni verileri ekleme
  await knex("revenue").insert([
    { month: "Oca", revenue: 4000, target: 3800 },
    { month: "Şub", revenue: 3000, target: 3200 },
    { month: "Mar", revenue: 5000, target: 4500 },
    { month: "Nis", revenue: 4500, target: 4200 },
    { month: "May", revenue: 6000, target: 5500 },
    { month: "Haz", revenue: 5500, target: 5800 },
    { month: "Tem", revenue: 7000, target: 6500 },
  ]);
};
