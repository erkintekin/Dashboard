// Express router
const express = require("express");
const { login, logout } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware"); // Middleware import
const router = express.Router();

// Login'e gelen POST isteklerini karşılama
router.post("/login", login);

// Logout'a gelen POST isteklerini karşılama
router.post("/logout", authenticateToken, logout); // Logout işlemi için token doğrulama gerekli

module.exports = router;
