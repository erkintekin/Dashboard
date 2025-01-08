const express = require("express");
const router = express.Router();
const { getDailySales } = require("../controllers/salesByCategoryController");
const authenticateToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Günlük satış trendini döndürme
router.get("/daily-trend", authenticateToken, allowRoles(1, 2), getDailySales);

module.exports = router;
