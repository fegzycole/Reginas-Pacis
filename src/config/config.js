const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_DEV",
    url: process.env.DATABASE_DEV,
    dialect: "mysql",
  },
  production: {
    use_env_variable: "CLEARDB_DATABASE_URL",
    url: process.env.CLEARDB_DATABASE_URL,
    dialect: "mysql",
  },
};
