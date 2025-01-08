const express = require("express");
const router = express.Router();
const {
  getUserDemographics,
} = require("../controllers/userDemographicsController");
const authenticateToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Kullanıcı demografik verilerini döndüren endpoint
router.get(
  "/demography",
  authenticateToken,
  allowRoles(1, 2),
  getUserDemographics
);

module.exports = router;
