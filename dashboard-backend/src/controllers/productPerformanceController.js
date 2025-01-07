const knex = require("../config/knex");

exports.getProductPerformance = async (req, res) => {
  try {
    const performanceData = await knex("product_performance")
      .select("name", "sales", "revenue", "profit")
      .orderBy("id");
    res.json(performanceData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
