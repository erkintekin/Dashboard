const express = require("express");
const router = express.Router();
const { getOrders } = require("../controllers/ordersController");
const authenticateToken = require("../middleware/authMiddleware");

// Sipariş listesini döndürme
router.get("/totalorders", authenticateToken, getOrders);

module.exports = router;
