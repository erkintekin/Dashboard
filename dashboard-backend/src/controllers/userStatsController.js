const knex = require("../config/knex");

exports.getUserStats = async (req, res) => {
  try {
    const stats = await knex("user_stats")
      .select("total_users", "new_users_today", "active_users", "churn_rate")
      .first();
    res.json(stats);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
