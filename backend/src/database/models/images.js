const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const images = db.define(
  "images",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "images" }
);

db.sync();

module.exports = images;
