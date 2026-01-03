'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order, {foreignKey: 'user_id'});
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:{
        msg:"Username must be Unique",
        args:true
      },
      validate:{
        notEmpty:{
          msg:"Username is Required"
        },
        notNull:{
          msg:"Username is Required"
        },
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:{
        msg:"Email must be unique",
        args:true
      },
      validate:{
        notEmpty:{
          msg:"Email is Required"
        },
        notNull:{
          msg:"Email is Required"
        },
        isEmail:{
          msg:"Must be Email format",
          args:true
        }
      }
    },
    password:  {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Password is required"
        },
        notNull:{
          msg:"Password is required"
        }
      }
    },
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    role:  {
      type:DataTypes.STRING,
      defaultValue:"Customer"
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance)=>{
    instance.password = hashPassword(instance.password)
  })
  return User;
};