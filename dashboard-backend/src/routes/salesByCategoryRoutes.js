const express = require("express");
const router = express.Router();
const { getSalesByCategory } = require("../controllers/salesController");
const authenticateToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Kategorilere göre satış verilerini döndürme
router.get(
  "/by-category",
  authenticateToken,
  allowRoles(1, 2),
  getSalesByCategory
);

module.exports = router;
