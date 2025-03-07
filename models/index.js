// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const Login_Credentials = require('./LoginCredentials')(sequelize, DataTypes);
const MFACode = require('./MFACode')(sequelize, DataTypes);

Login_Credentials.hasOne(MFACode, { foreignKey: 'id' });
MFACode.belongsTo(Login_Credentials, { foreignKey: 'id' });

module.exports = {
  Login_Credentials,
  MFACode,
  sequelize,
};
