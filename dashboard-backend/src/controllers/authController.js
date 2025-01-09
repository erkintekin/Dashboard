const knex = require("../config/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Eksik veya yanlış bilgi" });
    }

    await knex("users").where({ id: user.id }).update({ isActive: true });

    const token = jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Başarıyla giriş yapıldı", token });
  } catch (err) {
    console.error("Hata oluştu:", err);
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};

exports.logout = async (req, res) => {
  const userId = req.user.id;

  try {
    await knex("users").where({ id: userId }).update({ isActive: false });
    res.json({ message: "Başarıyla çıkış yapıldı" });
  } catch (err) {
    console.error("Hata oluştu:", err);
    res
      .status(500)
      .json({ message: "Çıkış sırasında hata oluştu", error: err.message });
  }
};
