/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("user_activity_heatmap").del();

  // Yeni verileri ekleme
  await knex("user_activity_heatmap").insert([
    {
      day: "Pzt",
      "0_4": 20,
      "4_8": 40,
      "8_12": 60,
      "12_16": 80,
      "16_20": 100,
      "20_24": 30,
    },
    {
      day: "Sal",
      "0_4": 30,
      "4_8": 50,
      "8_12": 70,
      "12_16": 90,
      "16_20": 110,
      "20_24": 40,
    },
    {
      day: "Çrş",
      "0_4": 40,
      "4_8": 60,
      "8_12": 80,
      "12_16": 100,
      "16_20": 120,
      "20_24": 50,
    },
    {
      day: "Prş",
      "0_4": 50,
      "4_8": 70,
      "8_12": 90,
      "12_16": 110,
      "16_20": 130,
      "20_24": 60,
    },
    {
      day: "Cum",
      "0_4": 60,
      "4_8": 80,
      "8_12": 100,
      "12_16": 120,
      "16_20": 140,
      "20_24": 70,
    },
    {
      day: "Cmt",
      "0_4": 70,
      "4_8": 90,
      "8_12": 110,
      "12_16": 130,
      "16_20": 150,
      "20_24": 80,
    },
    {
      day: "Paz",
      "0_4": 80,
      "4_8": 100,
      "8_12": 120,
      "12_16": 140,
      "16_20": 160,
      "20_24": 90,
    },
  ]);
};
