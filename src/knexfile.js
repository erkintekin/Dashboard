/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg", // PG Client for PostgreSQL
    connection: {
      host: "127.0.0.1", //Localhost
      user: "postgres",
      password: "password",
      database: "role_management",
    },
    migrations: {
      directory: "./migrations", // Migration files
    },
    seeds: {
      directory: "./seeds", // Seed files
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
