const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/database/user.db",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("User SQLite connected");
    await sequelize.sync();
  } catch (error) {
    console.error("User DB connection error:", error);
  }
};

module.exports = { sequelize, connectDB };
