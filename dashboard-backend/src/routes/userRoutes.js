const express = require("express");
const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getProfileById,
  updateProfile,
} = require("../controllers/userController");
const allowRoles = require("../middleware/roleMiddleware");
const authenticateToken = require("../middleware/authMiddleware");
const restrictToSelf = require("../middleware/restrictToSelf");
const router = express.Router();

// Genel kullanıcıları listeleme (admin ve superadmin)
router.get("/", authenticateToken, allowRoles(1, 2), getUsers);

// Kullanıcı bilgisi ID ile alma
router.get("/:id", authenticateToken, restrictToSelf, getProfileById);

// Profil güncelleme
router.put("/profile", authenticateToken, updateProfile);

// Kullanıcı oluşturma
router.post("/", authenticateToken, allowRoles(1), createUser);

// Kullanıcı silme
router.delete("/:id", authenticateToken, allowRoles(1), deleteUser);

// Kullanıcı güncelleme
router.put("/:id", authenticateToken, allowRoles(1), updateUser);

module.exports = router;
