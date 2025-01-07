const express = require("express");
const router = express.Router();
const { getSalesChannels } = require("../controllers/salesChannelController");
const authenticateToken = require("../middleware/authMiddleware");

// Satış kanallarını döndüren endpoint
router.get("/channels", authenticateToken, getSalesChannels);

module.exports = router;
