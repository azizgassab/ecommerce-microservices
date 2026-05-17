const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("SQLite connected");

    await sequelize.sync();

  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sequelize,
  connectDB,
};