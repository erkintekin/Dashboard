const knex = require("../config/knex");

// Sepete ürün ekleme
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Eksik alanlar mevcut" });
  }

  try {
    const [cartItem] = await knex("cart").where({
      user_id: req.user.id,
      product_id: productId,
    });

    if (cartItem) {
      // Ürün zaten sepette varsa miktarı artır
      await knex("cart")
        .where({ user_id: req.user.id, product_id: productId })
        .update({ quantity: cartItem.quantity + quantity });
    } else {
      // Yeni ürün ekle
      await knex("cart").insert({
        user_id: req.user.id,
        product_id: productId,
        quantity,
      });
    }

    res.status(201).json({ message: "Ürün sepete eklendi." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};

// Sepetteki ürünleri getirme
exports.getCart = async (req, res) => {
  try {
    const cartItems = await knex("cart")
      .join("products", "cart.product_id", "products.id")
      .select(
        "cart.product_id as id",
        "products.name",
        "products.price",
        "products.image_url",
        "cart.quantity"
      )
      .where({ user_id: req.user.id });

    res.json(cartItems);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};

// Sepetten ürün kaldırma
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedRows = await knex("cart")
      .where({ user_id: req.user.id, product_id: productId })
      .del();

    if (!deletedRows) {
      return res.status(404).json({ message: "Ürün bulunamadı." });
    }

    res.json({ message: "Ürün sepetten çıkarıldı." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
