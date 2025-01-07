const express = require("express");
const router = express.Router();
const { getSales } = require("../controllers/salesController");
const authenticateToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Sadece SuperAdmin (1) ve Admin (2) rolleri bu işlemi yapabilir
router.get("/totalsales", authenticateToken, allowRoles(1, 2), getSales);

module.exports = router;
