// models/MFACode.js
module.exports = (sequelize, DataTypes) => {
    const MFACode = sequelize.define('MFA_Code', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'MFA_Code',
      timestamps: false,
    });
  
    return MFACode;
  };
  