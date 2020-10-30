/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prize.belongsTo(models.Admin2)
    }
  };
  Prize.init({
    prize_name: DataTypes.STRING,
    image_URL: DataTypes.STRING,
    description: DataTypes.STRING,
    probability: DataTypes.INTEGER,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prize',
  });
  return Prize;
};