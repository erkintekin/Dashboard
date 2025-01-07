/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_retention", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("week").notNullable(); // Hafta bilgisi
    table.integer("retention").notNullable(); // Kullanıcı tutma oranı (%)
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_retention");
};
