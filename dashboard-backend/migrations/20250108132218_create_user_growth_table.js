/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_growth", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("month").notNullable(); // Ay
    table.integer("users").notNullable(); // Kullanıcı sayısı
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_growth");
};
