/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Tabloyu temizle
  await knex("user_growth").del();

  // Örnek veri ekle
  await knex("user_growth").insert([
    { month: "Oca", users: 1000 },
    { month: "Şub", users: 1500 },
    { month: "Mar", users: 2000 },
    { month: "Nis", users: 3000 },
    { month: "May", users: 4000 },
    { month: "Haz", users: 5000 },
  ]);
};
