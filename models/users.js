
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    createdAt:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: true,
    }
  },{
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
