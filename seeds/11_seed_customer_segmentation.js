/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("customer_segmentation").del();

  // Yeni verileri ekleme
  await knex("customer_segmentation").insert([
    { subject: "Etkileşim", A: 120, B: 110, fullMark: 150 },
    { subject: "Bağlılık", A: 98, B: 130, fullMark: 150 },
    { subject: "Memnuniyet", A: 86, B: 130, fullMark: 150 },
    { subject: "Harcamalar", A: 99, B: 100, fullMark: 150 },
    { subject: "Frekans", A: 85, B: 90, fullMark: 150 },
    { subject: "Son Aktivite", A: 65, B: 85, fullMark: 150 },
  ]);
};
