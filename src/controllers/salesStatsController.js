const knex = require("../config/knex");

exports.getSalesStats = async (req, res) => {
  try {
    const stats = await knex("sales_stats")
      .select(
        "total_revenue",
        "average_order_value",
        "conversion_rate",
        "sales_growth"
      )
      .first();
    res.json(stats);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
