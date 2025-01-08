const knex = require("../config/knex");

// Günlük satış trendini döndürme
exports.getDailySales = async (req, res) => {
  try {
    const salesData = await knex("sales_daily")
      .select("name", "sales")
      .orderBy("id"); // ID'ye göre sıralama yapıyorum
    res.status(200).json(salesData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
