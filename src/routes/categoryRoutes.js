const express = require("express");
const router = express.Router();
const {
  getCategoryDistribution,
} = require("../controllers/categoryController");
const authenticateToken = require("../middleware/authMiddleware");

// Kategori dağılımını döndüren endpoint
router.get("/distribution", authenticateToken, getCategoryDistribution);

module.exports = router;
