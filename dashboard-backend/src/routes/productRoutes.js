const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authenticateToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { get } = require("./userRoutes");
const { update } = require("../config/knex");
const router = express.Router();

router.get("/list", authenticateToken, getProducts); // Tüm ürünleri listeleme
router.get("/:id", authenticateToken, getProductById); // Belirli bir ürünü ID ile getirme
router.post("/add", authenticateToken, allowRoles(1, 2), createProduct); // Ürün ekleme
router.put("/edit/:id", authenticateToken, allowRoles(1, 2), updateProduct); // Ürün güncelleme
router.delete(
  "/delete/:id",
  authenticateToken,
  allowRoles(1, 2),
  deleteProduct
); // Ürün silme

module.exports = router;
