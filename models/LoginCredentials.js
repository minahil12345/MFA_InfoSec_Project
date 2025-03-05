
module.exports = (sequelize, DataTypes) => {
    const LoginCredentials = sequelize.define('Login_Credentials', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      security_question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      tableName: 'Login_Credentials',
      timestamps: false,
    });
  
    return LoginCredentials;
  };
  