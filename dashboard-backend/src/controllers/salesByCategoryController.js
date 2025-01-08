const knex = require("../config/knex");

// Kategorilere göre satış verilerini döndürme
exports.getSalesByCategory = async (req, res) => {
  try {
    const categoryData = await knex("sales_by_category")
      .select("name", "value")
      .orderBy("id");
    res.status(200).json(categoryData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
