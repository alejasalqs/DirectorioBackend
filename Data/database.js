const Sequelize = require('sequelize');
const config = require('./config');

const db = {};

const sequelize = new Sequelize(
  config.database.DB_NAME,
  config.database.DB_USERNAME,
  config.database.DB_PASSWORD,
  {
    host: config.database.DB_HOST,
    dialect: 'mssql',
    dialectOptions: {
      instanceName: config.database.DB_INSTANCE_NAME,
      trustServerCertificate: true,
    },
  }
);

db.sequelize = sequelize;

module.exports = db;
