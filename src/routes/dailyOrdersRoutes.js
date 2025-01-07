const express = require("express");
const router = express.Router();
const { getDailyOrders } = require("../controllers/dailyOrdersController");
const authenticateToken = require("../middleware/authMiddleware");

// Günlük siparişleri döndürme
router.get("/daily", authenticateToken, getDailyOrders);

module.exports = router;
