const express = require("express");
const router = express.Router();
const {
  getUserActivityHeatmap,
} = require("../controllers/userActivityController");
const authenticateToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Kullanıcı aktivitesi heatmap verilerini döndürme
router.get(
  "/activities",
  authenticateToken,
  allowRoles(1, 2),
  getUserActivityHeatmap
);

module.exports = router;
