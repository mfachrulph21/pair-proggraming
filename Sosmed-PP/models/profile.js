'use strict';
const {
  Model
} = require('sequelize');
const convertDate = require('../helpers/convertDate');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
 
    static associate(models) {
      Profile.belongsTo(models.User)
    }

  }
  Profile.init({
    biodata: {
      type : DataTypes.STRING,
      defaultValue : ''
    },
    birthDate: {
      type : DataTypes.DATE,
      defaultValue : convertDate(new Date())
    },
    gender:{
      type : DataTypes.STRING,
      defaultValue : 'Male'
    },
    phone: {
      type : DataTypes.STRING,
      defaultValue : ''
    }, 
    UserId: {
      type : DataTypes.INTEGER, 
    }, 
    photo: {
      type : DataTypes.STRING,
      defaultValue : 'https://i0.wp.com/www.alphr.com/wp-content/uploads/2020/10/twitter.png?w=690&ssl=1'
    } 
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};