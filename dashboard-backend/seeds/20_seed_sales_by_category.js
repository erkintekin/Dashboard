/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("sales_by_category").del();

  // Yeni verileri ekleme
  await knex("sales_by_category").insert([
    { name: "Elektronik", value: 400 },
    { name: "Giyim", value: 300 },
    { name: "Ev & Bahçe", value: 200 },
    { name: "Kitap", value: 100 },
    { name: "Diğerleri", value: 150 },
  ]);
};
