const express = require("express");
const {
  getUsers,
  createUser,
  deleteUser,
} = require("../controllers/userController");
const authenticationToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authenticateToken, allowRoles(1, 2), getUsers); // Sadece admin ve superAdmin için get işlemi
router.post("/", authenticateToken, allowRoles(1), createUser); // Sadece superAdmin user oluşturabilir
router.delete("/:id", authenticateToken, allowRoles(1), deleteUser); // Sadece superAdmin delete yapabilir

module.exports = router;
