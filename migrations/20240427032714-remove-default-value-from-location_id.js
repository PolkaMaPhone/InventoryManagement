// Purpose: Remove default value from location_id column in shelves table and the tubs table.
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('shelves', 'location_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    });
    // Remove default value from location_id column in tubs table
    await queryInterface.changeColumn('tubs', 'location_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('shelves', 'location_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
    // Add default value to location_id column in tubs table
    await queryInterface.changeColumn('tubs', 'location_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
  },
};