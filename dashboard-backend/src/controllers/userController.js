const knex = require("../config/knex");
const bcrypt = require("bcrypt");

// SuperAdmin için kullanıcı listeleme
exports.getUsers = async (req, res) => {
  try {
    const users = await knex("users")
      .join("roles", "users.role_id", "roles.id") // Rolleri birleştir
      .select(
        "users.id",
        "users.name",
        "users.email",
        "roles.name as role",
        "users.isActive"
      );
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};

// SuperAdmin için kullanıcı oluşturma
exports.createUser = async (req, res) => {
  const { name, email, password, role_id } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      role_id,
    });
    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu" });
  } catch {
    res
      .status(500)
      .json({ message: "Internal servis hatası", error: err.message });
  }
};

// Super admin için kullanıcı silme

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await knex("users").where({ id }).del();
    res.json({ message: "Kullanıcı başarıyla silindi" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal servis hatası", error: err.message });
  }
};

// Kullanıcı güncelleme (Sadece SuperAdmin)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role_id } = req.body;

  try {
    const updatedRows = await knex("users").where({ id }).update({
      name,
      email,
      role_id,
    });

    if (!updatedRows) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    res.json({ message: "Kullanıcı başarıyla güncellendi." });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Kullanıcı güncellenirken bir hata oluştu.",
        error: err.message,
      });
  }
};
