const { DataTypes } = require("sequelize");
const sequelize = require("../../../db/config");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: "../../../../public/uploads/profile/default-profile.png",
  },
});

module.exports = User;
