// Express router
const express = require("express");
const { login } = require("../controllers/authController");
const router = express.Router();

// Login'e gelen post isteklerini karşılar, route eder
router.post("/login", login);

module.exports = router;
