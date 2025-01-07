const express = require("express");
const router = express.Router();
const { getSalesOverview } = require("../controllers/salesOverviewController");
const authenticateToken = require("../middleware/authMiddleware");

// Satış trendlerini döndürme
router.get("/overview", authenticateToken, getSalesOverview);

module.exports = router;
