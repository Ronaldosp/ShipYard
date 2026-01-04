'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = [
      {
        name: 'Engine Parts',
        description: 'Spare parts related to main engines and auxiliary engines',
        thumbnail: 'https://www.zavamarine.com/wp-content/uploads/2025/04/ship-engine-parts-02.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Electrical & Electronics',
        description: 'Electrical components, control systems, and electronic equipment',
        thumbnail: 'https://www.greatlakesskipper.com/media/catalog/category/Electrical-boat-parts-for-s.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Deck Equipment',
        description: 'Equipment and tools used on ship decks for operations and safety',
        thumbnail: 'https://www.sotra.net/wp-content/uploads/2023/11/Deck-equipment-Sotra.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Safety Equipment',
        description: 'Safety-related equipment required for maritime regulations',
        thumbnail: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/1676543/818688_305973.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pumps & Valves',
        description: 'Marine pumps and valve systems for fluid control',
        thumbnail: 'https://5.imimg.com/data5/SELLER/Default/2024/8/444354362/ZA/BM/AS/201941699/hydraulic-spares-500x500.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Categories', categories);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {
            truncate: true,
            restartIdentity: true,
            cascade: true
          });
  }
};
