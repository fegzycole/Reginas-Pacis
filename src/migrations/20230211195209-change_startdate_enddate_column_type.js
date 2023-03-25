"use strict";

const TABLE_NAME = "Bookings";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn(TABLE_NAME, "startDate", {
        type: Sequelize.INTEGER,
      });

      await queryInterface.addColumn(TABLE_NAME, "endDate", {
        type: Sequelize.INTEGER,
      });
    } catch (error) {
      console.log({ error });
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.removeColumn(TABLE_NAME, "startDate");
      await queryInterface.removeColumn(TABLE_NAME, "endDate");
    } catch (error) {
      console.log({ error });
    }
  },
};
