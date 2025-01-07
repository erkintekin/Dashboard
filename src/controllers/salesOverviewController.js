const knex = require("../config/knex");

exports.getSalesOverview = async (req, res) => {
  try {
    const salesOverview = await knex("sales_overview")
      .select("month", "sales", "year")
      .orderBy("id");
    res.json(salesOverview);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
