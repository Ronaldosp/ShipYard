'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        username: 'admin',
        email: 'admin@mail.com',
        password: hashPassword('admin123'),
        address: 'Admin Office',
        phoneNumber: '0800000000',
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'test',
        email: 'test@mail.com',
        password: hashPassword('test123'),
        address: 'Batam',
        phoneNumber: '08123456789',
        role: 'Customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', users);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
