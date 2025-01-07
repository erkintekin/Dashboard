const knex = require("../config/knex");

exports.getDailyOrders = async (req, res) => {
  try {
    const dailyOrders = await knex("daily_orders")
      .select("date", "orders")
      .orderBy("date", "asc");
    res.json(dailyOrders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
