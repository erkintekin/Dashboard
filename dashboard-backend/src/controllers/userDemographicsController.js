const knex = require("../config/knex");

// Kullanıcı demografik verilerini döndürme
exports.getUserDemographics = async (req, res) => {
  try {
    const demographicsData = await knex("user_demographics")
      .select("age_range as name", "value")
      .orderBy("id");
    res.status(200).json(demographicsData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
