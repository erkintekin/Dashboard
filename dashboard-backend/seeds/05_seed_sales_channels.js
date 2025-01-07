/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Veri varsa temizle
  await knex("sales_channels").del();

  // Yeni verileri ekleme
  await knex("sales_channels").insert([
    { name: "Website", value: 45600 },
    { name: "Mobile App", value: 38200 },
    { name: "Marketplace", value: 29800 },
    { name: "Social Media", value: 18700 },
  ]);
};
