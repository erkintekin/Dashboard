const knex = require("../config/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await knex("users").where({ email }).first();
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    const okMatch = await bcrypt.compare(password, user.password);
    if (!okMatch)
      return res.status(401).json({ message: "Eksik veya yanlış bilgi" });

    const token = jwt.sign(
      { id: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server hatası", error: err.message });
  }
};
