const knex = require("../config/knex");

exports.getChannelPerformance = async (req, res) => {
  try {
    const channelData = await knex("channel_performance")
      .select("name", "value")
      .orderBy("id");
    res.json(channelData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
