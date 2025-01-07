/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Varsa eski verileri temizle
  await knex("overview").del();

  // Yeni verileri ekleme
  await knex("overview").insert([
    { name: "Kar", value: "$1,234,567", change: 12.5, icon: "DollarSign" },
    { name: "Kullanıcılar", value: "45,678", change: 8.3, icon: "Users" },
    { name: "Siparişler", value: "9,876", change: -3.2, icon: "ShoppingBag" },
    {
      name: "Sayfa Görüntüleme",
      value: "1,234,567",
      change: 15.7,
      icon: "Eye",
    },
  ]);
};
