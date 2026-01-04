'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = [
      {
        name: 'Marine Diesel Fuel Injector',
        description: 'High-pressure fuel injector for marine diesel engines',
        thumbnail: 'https://image.made-in-china.com/365f3j00fFVqsDgzbZcG/Marine-Main-Auxiliary-Diesel-Engine-Fuel-Injection-Spare-Parts.webp',
        category_id: 1,
        price: 1250000,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Engine Oil Filter',
        description: 'Heavy-duty oil filter suitable for marine engines',
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR84okgORfX_Thu5SRB9mpvbaAw_XVqMkHfoQ&s',
        category_id: 1,
        price: 1800000,
        stock: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ship Navigation Control Panel',
        description: 'Electronic control panel for navigation and monitoring systems',
        thumbnail: 'https://thumbs.dreamstime.com/b/marine-navigation-simulation-system-ship-control-panel-steering-wheel-electronic-equipment-captain-bridge-as-342079606.jpg',
        category_id: 2,
        price: 3200000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Marine Circuit Breaker',
        description: 'Electrical circuit breaker designed for ship power systems',
        thumbnail: 'https://www.baywatt.com/cdn/shop/collections/circuit_breaker.jpg?v=1753354156&width=1100',
        category_id: 2,
        price: 4500000,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Anchor Windlass',
        description: 'Hydraulic anchor windlass for cargo and tanker vessels',
        thumbnail: 'https://lh5.googleusercontent.com/proxy/Cy_amsNqU4_-QOgFAWtDzP4uNfay8dXuRnkL6NXP3rZ1stANAo5feOPzbhJgZTkvyM7HWKbMQ2merDmDOALa_rVZgRkJArZeHxXawkUFZ7QAjC_cwXaIk7ikcSz5hmBwfcE',
        category_id: 3,
        price: 7800000,
        stock: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mooring Rope (Polypropylene)',
        description: 'High-strength polypropylene rope for ship mooring',
        thumbnail: 'https://s.alicdn.com/@sc01/kf/Hd9ebf125155d461bbd086aa88174149a8.jpg_720x720q50.jpg',
        category_id: 3,
        price: 2200000,
        stock: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SOLAS Approved Life Jacke',
        description: 'Life jacket compliant with SOLAS maritime safety standards',
        thumbnail: 'https://icbrindle.com/media/.renditions/wysiwyg/Besto_Passenger_Lifejacket_-_SOLAS.png',
        category_id: 4,
        price: 9500000,
        stock: 27,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fire Fighting Foam Nozzle',
        description: 'Marine-grade foam nozzle for fire fighting systems',
        thumbnail: 'https://vincipemadam.com/wp-content/uploads/2020/09/FOAM-NOZZLE-THUMBNAIL.jpg',
        category_id: 4,
        price: 6800000,
        stock: 32,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Centrifugal Bilge Pump',
        description: 'Marine centrifugal pump used for bilge water removal',
        thumbnail: 'https://www.desmi.com/media/og1lyw3y/672631_asm-nsl125-265-a13-fritlagtpng-719x503.png?width=327&height=245&v=1db794a18117660',
        category_id: 5,
        price: 2100000,
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bronze Gate Valve',
        description: 'Corrosion-resistant bronze gate valve for marine pipelines',
        thumbnail: 'https://static.wixstatic.com/media/7e6385_0292412b3c8d4f9aa52a052666d19d2f~mv2.png/v1/fill/w_480,h_480,al_c,lg_1,q_85,enc_avif,quality_auto/7e6385_0292412b3c8d4f9aa52a052666d19d2f~mv2.png',
        category_id: 5,
        price: 3900000,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ];

    await queryInterface.bulkInsert('Items', items);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Items", null, {
            truncate: true,
            restartIdentity: true,
            cascade: true
          });
  }
};
