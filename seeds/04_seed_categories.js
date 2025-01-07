/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Mevcut verileri temizle
  await knex("categories").del();

  // Yeni verileri ekle
  await knex("categories").insert([
    { name: "Elektronik", value: 4500 },
    { name: "Aksesuar", value: 3200 },
    { name: "Ev Aletleri", value: 2800 },
    { name: "Kitap", value: 2100 },
    { name: "Fitness", value: 1900 },
  ]);
};
