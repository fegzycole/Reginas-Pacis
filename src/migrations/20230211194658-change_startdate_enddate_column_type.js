"use strict";

const TABLE_NAME = "Bookings";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.removeColumn(TABLE_NAME, "startDate");

      await queryInterface.removeColumn(TABLE_NAME, "endDate");
    } catch (error) {
      console.log({ error });
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn(TABLE_NAME, "startDate", {
        type: Sequelize.DATE,
        allowNull: false,
      });

      await queryInterface.addColumn(TABLE_NAME, "endDate", {
        type: Sequelize.DATE,
        allowNull: false,
      });
    } catch (error) {
      console.log({ error });
    }
  },
};
