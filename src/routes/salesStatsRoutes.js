const express = require("express");
const router = express.Router();
const { getSalesStats } = require("../controllers/salesStatsController");
const authenticateToken = require("../middleware/authMiddleware");

// Satış istatistiklerini döndürme
router.get("/salesstats", authenticateToken, getSalesStats);

module.exports = router;
