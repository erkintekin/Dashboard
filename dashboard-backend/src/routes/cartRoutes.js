const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", authenticateToken, addToCart); // Sepete ürün ekleme
router.get("/", authenticateToken, getCart); // Sepeti listeleme
router.delete("/:productId", authenticateToken, removeFromCart); // Ürün kaldırma

module.exports = router;
