/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_stats", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.integer("total_users").notNullable(); // Toplam kullanıcı sayısı
    table.integer("new_users_today").notNullable(); // Bugün eklenen kullanıcı sayısı
    table.integer("active_users").notNullable(); // Aktif kullanıcı sayısı
    table.float("churn_rate").notNullable(); // Churn oranı (%)
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_stats");
};
