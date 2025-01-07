const knex = require("../config/knex");

exports.getSales = async (req, res) => {
  try {
    const sales = await knex("sales")
      .select("id", "month", "sales", "year")
      .orderBy("id"); // ID'ye göre sıralama yapıyorum

    res.json(sales);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
