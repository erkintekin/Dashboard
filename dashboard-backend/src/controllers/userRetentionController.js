const knex = require("../config/knex");

exports.getUserRetention = async (req, res) => {
  try {
    const retentionData = await knex("user_retention")
      .select("week", "retention")
      .orderBy("id");
    res.json(retentionData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
