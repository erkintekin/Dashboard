const knex = require("../config/knex");

exports.getOrders = async (req, res) => {
  try {
    const orders = await knex("orders")
      .select("order_id", "customer", "total", "status", "date")
      .orderBy("date", "asc");
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
