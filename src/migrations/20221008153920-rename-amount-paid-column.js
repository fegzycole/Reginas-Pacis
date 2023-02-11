'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    queryInterface.renameColumn('Bookings', 'amountPayed', 'amountPaid');
  },

  async down (queryInterface) {
    queryInterface.renameColumn('Bookings', 'amountPaid', 'amountPayed');
  }
};
