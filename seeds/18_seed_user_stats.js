/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizleme
  await knex("user_stats").del();

  // Yeni verileri ekleme
  await knex("user_stats").insert([
    {
      total_users: 152845,
      new_users_today: 243,
      active_users: 98520,
      churn_rate: 2.4,
    },
  ]);
};
