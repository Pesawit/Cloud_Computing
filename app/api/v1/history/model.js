const { DataTypes } = require("sequelize");
const sequelize = require("../../../db/config");

const DetectionHistory = sequelize.define("DetectionHistory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  result: {
    type: DataTypes.ENUM("brown spots", "healthy", "white scale"),
    allowNull: false,
  },
  recommendation: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  detectedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = DetectionHistory;
