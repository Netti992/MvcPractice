'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clocks', [
      {
        manufacturer: 'Casio',
        type: 'retro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'ora2',
        type: 'retro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Casio',
        type: 'retro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manufacturer: 'Casio',
        type: 'retro',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
