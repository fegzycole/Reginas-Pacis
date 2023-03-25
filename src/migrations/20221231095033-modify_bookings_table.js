"use strict";

const TABLE_NAME = "Bookings";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn(TABLE_NAME, "preferredSundayMass");
    await queryInterface.removeColumn(TABLE_NAME, "preferredWeekdayMass");
    await queryInterface.removeColumn(TABLE_NAME, "lastName");
    await queryInterface.renameColumn(TABLE_NAME, "firstName", "name");
  },

  async down(queryInterface) {
    await queryInterface.addColumn(TABLE_NAME, "preferredSundayMass", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn(TABLE_NAME, "preferredWeekdayMass", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn(TABLE_NAME, "lastName", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.renameColumn(TABLE_NAME, "name", "firstName");
  },
};
