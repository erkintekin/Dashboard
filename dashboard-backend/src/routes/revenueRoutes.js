const express = require("express");
const router = express.Router();
const { getRevenueData } = require("../controllers/revenueController");
const authenticateToken = require("../middleware/authMiddleware");

// Gelir verilerini döndürme
router.get("/revenues", authenticateToken, getRevenueData);

module.exports = router;
