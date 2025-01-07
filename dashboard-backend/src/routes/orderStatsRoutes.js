const express = require("express");
const router = express.Router();
const { getOrderStats } = require("../controllers/orderStatsController");
const authenticateToken = require("../middleware/authMiddleware");

// Sipariş istatistiklerini döndürme
router.get("/orderstats", authenticateToken, getOrderStats);

module.exports = router;
