"use strict";

const TABLE_NAME = "Users";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.changeColumn(TABLE_NAME, "name", {
        type: Sequelize.STRING,
        allowNull: true,
      });

      await queryInterface.addColumn(TABLE_NAME, "isSuperAdmin", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false,
      });
    } catch (error) {
      console.log({ error });
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.changeColumn(TABLE_NAME, "name", {
        type: Sequelize.STRING,
        allowNull: false,
      });

      await queryInterface.removeColumn(TABLE_NAME, "isSuperAdmin");
    } catch (error) {
      console.log({ error });
    }
  },
};
