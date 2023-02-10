"use strict";

const INDEX_NAME = "bookings_startDate_endDate";
const TABLE = "Bookings";
const columns = ["startDate", "endDate"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex(TABLE, columns, {
      name: INDEX_NAME,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex(TABLE, INDEX_NAME);
  },
};
