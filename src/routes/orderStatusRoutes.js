const express = require("express");
const router = express.Router();
const {
  getOrderStatusDistribution,
} = require("../controllers/orderStatusController");
const authenticateToken = require("../middleware/authMiddleware");

// Sipariş durumu dağılımını döndürme
router.get("/orderdist", authenticateToken, getOrderStatusDistribution);

module.exports = router;
