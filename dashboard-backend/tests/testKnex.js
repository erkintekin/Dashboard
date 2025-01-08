require("dotenv").config(); // .env dosyasını yükleme
const knex = require("../src/config/knex"); // Knex yapılandırmasını yükleyin

(async () => {
  try {
    const result = await knex.raw("SELECT 1+1 AS result");
    console.log("Bağlantı başarılı:", result.rows);
    process.exit(0);
  } catch (error) {
    console.error("Bağlantı hatası:", error.message);
    process.exit(1);
  }
})();
