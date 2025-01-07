const express = require("express");
const router = express.Router();
const { getUserRetention } = require("../controllers/userRetentionController");
const authenticateToken = require("../middleware/authMiddleware");

// Kullanıcı tutma oranını döndürme
router.get("/retention", authenticateToken, getUserRetention);

module.exports = router;
