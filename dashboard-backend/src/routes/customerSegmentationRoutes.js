const express = require("express");
const router = express.Router();
const {
  getCustomerSegmentation,
} = require("../controllers/customerSegmentationController");
const authenticateToken = require("../middleware/authMiddleware");

// Müşteri segmentasyonunu döndürme
router.get("/customerseg", authenticateToken, getCustomerSegmentation);

module.exports = router;
