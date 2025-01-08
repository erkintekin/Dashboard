/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_demographics", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("age_range").notNullable(); // Yaş aralığı (18-24, 25-34, vb.)
    table.integer("value").notNullable(); // Kullanıcı sayısı
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_demographics");
};
