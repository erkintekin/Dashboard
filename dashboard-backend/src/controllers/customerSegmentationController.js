const knex = require("../config/knex");

exports.getCustomerSegmentation = async (req, res) => {
  try {
    const segmentationData = await knex("customer_segmentation")
      .select("subject", "A", "B", "fullMark")
      .orderBy("id");
    res.json(segmentationData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
