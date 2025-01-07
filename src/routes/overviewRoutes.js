const express = require("express");
const router = express.Router();
const { getOverviewData } = require("../controllers/overviewController");
const authenticateToken = require("../middleware/authMiddleware");

// Genel özet verilerini döndürme
router.get("/overviews", authenticateToken, getOverviewData);

module.exports = router;
