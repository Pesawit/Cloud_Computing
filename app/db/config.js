const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database.');
    return sequelize.sync();
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
