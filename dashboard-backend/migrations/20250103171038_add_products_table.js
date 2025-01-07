/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary(); // Ürün ID
    table.string("name").notNullable(); // Ürün adı
    table.string("category").notNullable(); // Ürün kategorisi
    table.decimal("price", 10, 2).notNullable(); // Ürün fiyatı
    table.integer("stock").notNullable(); // Stok miktarı
    table.text("description").notNullable(); // Ürün açıklaması
    table.string("image_url"); // Ürün resim URL'si
    table
      .integer("created_by")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // Ürünü oluşturan admin
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
