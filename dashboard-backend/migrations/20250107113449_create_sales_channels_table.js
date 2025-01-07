/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sales_channels", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("name").notNullable(); // Satış kanalı adı (Website, Mobile App)
    table.integer("value").notNullable(); // Değer (satış miktarı)
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sales_channels");
};
