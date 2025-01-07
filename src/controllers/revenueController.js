const knex = require("../config/knex");

exports.getRevenueData = async (req, res) => {
  try {
    const revenueData = await knex("revenue")
      .select("month", "revenue", "target")
      .orderBy("id");
    res.json(revenueData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
