/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const tableName = "products";

  if (!(await knex.schema.hasColumn(tableName, "sales"))) {
    await knex.schema.alterTable(tableName, (table) => {
      table.integer("sales").defaultTo(0); // Satış miktarı (varsayılan 0)
    });
  }

  if (!(await knex.schema.hasColumn(tableName, "image_url"))) {
    await knex.schema.alterTable(tableName, (table) => {
      table.string("image_url"); // Ürün resim URL'si
    });
  }

  if (!(await knex.schema.hasColumn(tableName, "description"))) {
    await knex.schema.alterTable(tableName, (table) => {
      table.text("description"); // Ürün açıklaması
    });
  }

  if (!(await knex.schema.hasColumn(tableName, "created_by"))) {
    await knex.schema.alterTable(tableName, (table) => {
      table
        .integer("created_by")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE"); // Ürünü oluşturan kullanıcı
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Eklenen sütunları kaldırma
  const tableName = "products";

  if (await knex.schema.hasColumn(tableName, "sales")) {
    await knex.schema.alterTable(tableName, (table) => {
      table.dropColumn("sales");
    });
  }

  if (await knex.schema.hasColumn(tableName, "image_url")) {
    await knex.schema.alterTable(tableName, (table) => {
      table.dropColumn("image_url");
    });
  }

  if (await knex.schema.hasColumn(tableName, "description")) {
    await knex.schema.alterTable(tableName, (table) => {
      table.dropColumn("description");
    });
  }

  if (await knex.schema.hasColumn(tableName, "created_by")) {
    await knex.schema.alterTable(tableName, (table) => {
      table.dropColumn("created_by");
    });
  }
};
