const knex = require("../config/knex");

exports.getCategoryDistribution = async (req, res) => {
  try {
    const categories = await knex("categories").select("name", "value");
    res.json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
