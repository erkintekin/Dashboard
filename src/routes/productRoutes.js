const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");
const authenticateToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { get } = require("./userRoutes");
const router = express.Router();

router.get("/", authenticateToken, getProducts);
router.get("/:id", authenticateToken, getProductById);
router.post("/", authenticateToken, allowRoles(2), createProduct); // Admine create yetkisi verilmesi

module.exports = router;
