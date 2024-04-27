'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add location_id column to tubs table
    await queryInterface.addColumn('tubs', 'location_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'locations',
        key: 'location_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      defaultValue: 1
    });

    // Add location_id column to shelves table
    await queryInterface.addColumn('shelves', 'location_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'locations',
        key: 'location_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      defaultValue: 1
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove location_id column from tubs table
    await queryInterface.removeColumn('tubs', 'location_id');

    // Remove location_id column from shelves table
    await queryInterface.removeColumn('shelves', 'location_id');
  }
};
