const knex = require("../config/knex");
const bcrypt = require("bcrypt");

// SuperAdmin için kullanıcı listeleme
exports.getUsers = async (req, res) => {
  try {
    const users = await knex("users").select("id", "name", "email", "role_id");
    res.json(users);
  } catch {
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
