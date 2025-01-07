const knex = require("../config/knex");

exports.getSalesChannels = async (req, res) => {
  try {
    const channels = await knex("sales_channels")
      .select("name", "value")
      .orderBy("id");
    res.json(channels);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
