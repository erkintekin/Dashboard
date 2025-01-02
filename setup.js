const { Client } = require("pg");

// PostgreSQL bağlantı ayarları
const connectionConfig = {
  host: "127.0.0.1",
  user: "postgres",
  password: "password",
  database: "postgres",
};

(async () => {
  const client = new Client(connectionConfig);

  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    const dbName = "role_management";
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log(`Database "${dbName}" created successfully`);
  } catch (err) {
    console.error("Error creating database:", err.message);
  } finally {
    await client.end();
    console.log("Connection closed");
  }
})();
