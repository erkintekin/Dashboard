const knex = require("../config/knex");

// Kullanıcı aktivitesi heatmap verilerini döndürme
exports.getUserActivityHeatmap = async (req, res) => {
  try {
    const activityData = await knex("user_activity_heatmap")
      .select("day as name", "0_4", "4_8", "8_12", "12_16", "16_20", "20_24")
      .orderBy("id");
    res.status(200).json(activityData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
