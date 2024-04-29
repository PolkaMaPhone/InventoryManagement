'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('shelves', 'name', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: 'name' // Optional: Specifies where to place the new column in the table
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('shelves', 'name');
  }
};
