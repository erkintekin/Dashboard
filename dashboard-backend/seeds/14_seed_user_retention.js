/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("user_retention").del();

  // Yeni verileri ekleme
  await knex("user_retention").insert([
    { week: "Hafta 1", retention: 100 },
    { week: "Hafta 2", retention: 75 },
    { week: "Hafta 3", retention: 60 },
    { week: "Hafta 4", retention: 50 },
    { week: "Hafta 5", retention: 45 },
    { week: "Hafta 6", retention: 40 },
    { week: "Hafta 7", retention: 38 },
    { week: "Hafta 8", retention: 35 },
  ]);
};
