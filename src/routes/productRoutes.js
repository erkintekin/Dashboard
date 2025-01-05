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

router.get("/add", authenticateToken, getProducts);
router.get("/:id", authenticateToken, getProductById);
router.post("/list", authenticateToken, allowRoles(1, 2), createProduct); // SuperAdmin ve Admin'e create yetkisi verilmesi
router.put("/edit/:id", authenticateToken, allowRoles(1, 2), updateProduct); // SuperAdmin ve Admin'e edit yetkisi verilmesi
router.delete(
  "/delete/:id",
  authenticateToken,
  allowRoles(1, 2),
  deleteProduct
); // SuperAdmin ve Admin'e delete yetkisi verilmesi
module.exports = router;
