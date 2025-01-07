/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("customer_segmentation", (table) => {
    table.increments("id").primary(); // Otomatik artan ID
    table.string("subject").notNullable(); // Demografik özellikler
    table.integer("A").notNullable(); // Segment A değerleri
    table.integer("B").notNullable(); // Segment B değerleri
    table.integer("fullMark").notNullable(); // Max değerler
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Oluşturulma tarihi
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("customer_segmentation");
};
