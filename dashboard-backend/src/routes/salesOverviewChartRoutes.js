const express = require("express");
const router = express.Router();
const {
  getMonthlySalesChart,
} = require("../controllers/salesOverviewChartController");
const authenticateToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Aylık satış grafiği verilerini döndürme
router.get(
  "/sales-chart",
  authenticateToken,
  allowRoles(1, 2),
  getMonthlySalesChart
);

module.exports = router;
