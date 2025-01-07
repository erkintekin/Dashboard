/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizle
  await knex("channel_performance").del();

  // Yeni verileri ekleme
  await knex("channel_performance").insert([
    { name: "Organik", value: 4000 },
    { name: "Sponsorlu", value: 3000 },
    { name: "Direkt", value: 2000 },
    { name: "Sosya Medya", value: 2780 },
    { name: "Referans", value: 1890 },
    { name: "Email", value: 2390 },
  ]);
};
