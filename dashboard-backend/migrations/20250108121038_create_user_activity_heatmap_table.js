/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_activity_heatmap", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("day").notNullable(); // Gün
    table.integer("0_4").notNullable(); // 00:00-04:00 arası aktivite sayısı
    table.integer("4_8").notNullable(); // 04:00-08:00 arası aktivite sayısı
    table.integer("8_12").notNullable(); // 08:00-12:00 arası aktivite sayısı
    table.integer("12_16").notNullable(); // 12:00-16:00 arası aktivite sayısı
    table.integer("16_20").notNullable(); // 16:00-20:00 arası aktivite sayısı
    table.integer("20_24").notNullable(); // 20:00-24:00 arası aktivite sayısı
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_activity_heatmap");
};
