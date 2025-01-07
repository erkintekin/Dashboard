const knex = require("../config/knex");

exports.getOverviewData = async (req, res) => {
  try {
    const overviewData = await knex("overview")
      .select("name", "value", "change", "icon")
      .orderBy("id");
    res.json(overviewData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
