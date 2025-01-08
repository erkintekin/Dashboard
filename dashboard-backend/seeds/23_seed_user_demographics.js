/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("user_demographics").del();

  // Yeni verileri ekleme
  await knex("user_demographics").insert([
    { age_range: "18-24", value: 20 },
    { age_range: "25-34", value: 30 },
    { age_range: "35-44", value: 25 },
    { age_range: "45-54", value: 15 },
    { age_range: "55+", value: 10 },
  ]);
};
