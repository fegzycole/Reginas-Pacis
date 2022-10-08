const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_DEV",
    url: process.env.DATABASE_DEV,
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DATABASE_PROD",
    url: process.env.DATABASE_PROD,
    dialect: "mysql",
  },
};
