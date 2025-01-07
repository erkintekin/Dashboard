/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizle
  await knex("daily_orders").del();

  // Yeni verileri ekleme
  await knex("daily_orders").insert([
    { date: "2023-07-01", orders: 45 },
    { date: "2023-07-02", orders: 52 },
    { date: "2023-07-03", orders: 49 },
    { date: "2023-07-04", orders: 60 },
    { date: "2023-07-05", orders: 55 },
    { date: "2023-07-06", orders: 58 },
    { date: "2023-07-07", orders: 62 },
  ]);
};
