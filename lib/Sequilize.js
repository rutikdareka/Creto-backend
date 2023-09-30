const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("creto", "starc_2", "rutik", {
  dialect: "postgres",
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDbConnection();
module.exports = { sequelize };
