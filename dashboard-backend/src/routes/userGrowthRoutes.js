const express = require("express");
const router = express.Router();
const { getUserGrowth } = require("../controllers/userGrowthController");
const authenticateToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Kullanıcı büyüme verilerini döndürme
router.get("/growth", authenticateToken, allowRoles(1, 2), getUserGrowth);

module.exports = router;
