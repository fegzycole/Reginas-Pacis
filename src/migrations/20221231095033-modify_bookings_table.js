"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn("bookings", "preferredSundayMass");
    await queryInterface.removeColumn("bookings", "preferredWeekdayMass");
    await queryInterface.removeColumn("bookings", "lastName");
    await queryInterface.renameColumn("bookings", "firstName", "name");
  },

  async down(queryInterface) {
    await queryInterface.addColumn("bookings", "preferredSundayMass", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("bookings", "preferredWeekdayMass", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("bookings", "lastName", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.renameColumn("bookings", "name", "firstName");
  },
};
