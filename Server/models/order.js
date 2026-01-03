'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {foreignKey: 'user_id'});
      Order.belongsToMany(models.Item, {through: models.OrderItem,foreignKey: 'order_id'});
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('PENDING', 'PAID', 'SHIPPED', 'CANCELLED'),
      defaultValue: 'PENDING'
    },
    paymentMethod: DataTypes.STRING,
    shippingAddress: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};