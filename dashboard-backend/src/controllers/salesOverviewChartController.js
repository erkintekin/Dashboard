const knex = require("../config/knex");

// Aylık satış grafiği verilerini döndürme
exports.getMonthlySalesChart = async (req, res) => {
  try {
    const salesData = await knex("sales_overview_chart")
      .select("month", "sales")
      .orderBy("id");
    res.status(200).json(salesData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
