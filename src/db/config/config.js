require("dotenv").config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
    pool: {
      max: 100,
      min: 0,
      acquire: 300000,
      idle: 10000,
    },
  },
}
