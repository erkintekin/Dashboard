const knex = require("../config/knex");

exports.getOrderStats = async (req, res) => {
  try {
    const stats = await knex("order_stats")
      .select(
        "total_orders",
        "pending_orders",
        "completed_orders",
        "total_revenue"
      )
      .first();
    res.json(stats);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
