const knex = require("../config/knex");

// Kullanıcı büyüme verilerini döndürme
exports.getUserGrowth = async (req, res) => {
  try {
    const growthData = await knex("user_growth")
      .select("month", "users")
      .orderBy("id");
    res.status(200).json(growthData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
