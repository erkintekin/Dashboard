const knex = require("../config/knex");

exports.getOrderStatusDistribution = async (req, res) => {
  try {
    const orderStatus = await knex("order_status")
      .select("name", "value")
      .orderBy("id");
    res.json(orderStatus);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
