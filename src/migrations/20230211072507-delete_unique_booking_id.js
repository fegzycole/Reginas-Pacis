"use strict";

const TABLE_NAME = "Bookings";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.removeColumn(TABLE_NAME, "uniqueBookingId");
    } catch (error) {
      console.log({ error });
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.addColumn(TABLE_NAME, "uniqueBookingId", {
        type: Sequelize.STRING,
        unique: true,
      });
    } catch (error) {
      console.log({ error });
    }
  },
};
