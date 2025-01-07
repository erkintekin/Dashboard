const express = require("express");
const router = express.Router();
const {
  getProductPerformance,
} = require("../controllers/productPerformanceController");
const authenticateToken = require("../middleware/authMiddleware");

// Ürün performansını döndürme
router.get("/performance", authenticateToken, getProductPerformance);

module.exports = router;
