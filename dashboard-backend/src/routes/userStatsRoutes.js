const express = require("express");
const router = express.Router();
const { getUserStats } = require("../controllers/userStatsController");
const authenticateToken = require("../middleware/authMiddleware");

// Kullanıcı istatistiklerini döndürme
router.get("/userstats", authenticateToken, getUserStats);

module.exports = router;
