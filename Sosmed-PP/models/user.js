'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');
const hashPassword = require('../helpers/password');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile)
      User.hasMany(models.Post)
    }
    
  }
  User.init({
    username: {
      unique : true,
      allowNull : false,
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'username cant be blank'
        },
        notNull : {
          msg : 'username cant be empty'
        }
      }
    },
    password: {
      allowNull : false,
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'password cant be blank'
        },
        notNull : {
          msg : 'password cant be empty'
        },
        max : {
          args : [20],
          msg :'Maximum 20 characters for password'
        },
        min : {
          args : [3],
          msg : 'Minimum 3 characters for password'
        }
      }
    },
    email: {
      allowNull : false,
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'email cant be blank'
        },
        notNull : {
          msg : 'email cant be empty'
        },
        isEmail : {
          msg : 'you not fill email format'
        }
      }

    },
    role:  {
      allowNull : false,
      type : DataTypes.STRING,
      validate : {
        notNull : {
          msg : 'you must select your role'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(instance, options) {
        
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};