const Sequelize = require('sequelize');
const sequelizeConfig = require('../config/sqlConfig');
 module.exports = (Sequelize,DataTypes) => {
  var  Model = Sequelize.define('User', {
    UUID: {
      type: DataTypes.INTEGER,
            allowNull: false,
            unique:true,
            primaryKey: true,
            autoIncrement: true
      },
     EMAIL_ID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    FULL_NAME: {
      type: DataTypes.STRING
    },
    PASSWORD : {
      type: DataTypes.STRING
    },
    GENDER : {
      type: DataTypes.STRING
    },
    DATE_OF_BIRTH :{
      type: DataTypes.DATEONLY
    },
    PHONE_NUMBER : {
      type: DataTypes.INTEGER,
   }, 
  },{
    freezeTableName: true,
    timestamps: false,
    tableName: 'user_master'
  });
  return Model;  
 } 
 