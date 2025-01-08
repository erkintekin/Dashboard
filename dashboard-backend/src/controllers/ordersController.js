exports.getOrders = async (req, res) => {
  try {
    const orders = await knex("orders")
      .select("order_id", "customer", "total", "status", "date")
      .orderBy("date", "asc");

    const formattedOrders = orders.map((order) => ({
      ...order,
      total: parseFloat(order.total), // total alanını sayıya çevirme
    }));

    res.json(formattedOrders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
