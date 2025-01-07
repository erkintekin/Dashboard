const express = require("express");
const router = express.Router();
const {
  getChannelPerformance,
} = require("../controllers/channelPerformanceController");
const authenticateToken = require("../middleware/authMiddleware");

// Kanal performansını döndürme
router.get("/channelperf", authenticateToken, getChannelPerformance);

module.exports = router;
