require("dotenv").config(); // .env dosyasını yükler

const knex = require("../src/config/knex"); // Doğru yolu kontrol edin
const bcrypt = require("bcrypt");

(async () => {
  try {
    const users = await knex("users").select("id", "password");
    for (const user of users) {
      if (user.password === "hashed_password") {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await knex("users")
          .where({ id: user.id })
          .update({ password: hashedPassword });
      }
    }
    console.log("Tüm şifreler başarıyla hashlendi.");
    process.exit(0);
  } catch (err) {
    console.error("Hata oluştu:", err.message);
    process.exit(1);
  }
})();
