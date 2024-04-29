'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn({
      tableName: 'shelves',
      schema: queryInterface.sequelize.options.dialectOptions.searchPath // Use configured schema
    }, 'name', 'label');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn({
      tableName: 'shelves',
      schema: queryInterface.sequelize.options.dialectOptions.searchPath // Use configured schema
    }, 'label', 'name');
  }
};
