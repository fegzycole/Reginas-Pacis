'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.renameColumn('bookings', 'amountPayed', 'amountPaid');
  },

  async down (queryInterface, Sequelize) {
    queryInterface.renameColumn('bookings', 'amountPaid', 'amountPayed');
  }
};
