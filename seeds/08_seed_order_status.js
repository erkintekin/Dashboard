/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("order_status").del();

  // Yeni verileri ekleme
  await knex("order_status").insert([
    { name: "Beklemede", value: 30 },
    { name: "İşlemde", value: 45 },
    { name: "Kargoya Verildi", value: 60 },
    { name: "Teslim Edildi", value: 120 },
  ]);
};
