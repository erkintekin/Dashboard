const knex = require("../config/knex");

// Adminler için içerik oluşturma
exports.createProduct = async (req, res) => {
  const { name, category, price, stock, description, image_url } = req.body;
  try {
    await knex("products").insert({
      name,
      category,
      price,
      stock,
      description,
      image_url,
      created_by: req.user.id, // Admin userID
    });
    res.status(201).json({ message: "Ürün başarıyla oluşturuldu" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal servis hatası", error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await knex("products").select(
      "id",
      "name",
      "category",
      "price",
      "stock",
      "description",
      "image_url"
    );
    res.json(products); // Ürünleri response olarak döndüm
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal servis hatası", error: err.message });
  }
};

// Spesifik bir ürünü görüntüleme
exports.getProductById = async (req, res) => {
  const { id } = req.params; // Paramstan ID aldım
  try {
    const product = await knex("products").where({ id }).first(); // Paramstaki IDye eşit olan ilk eşleşmeyi getir
    if (!product) {
      res.status(404).json({ message: "Ürün bulunamadı" });
    }
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal servis hatası", error: err.message });
  }
};
