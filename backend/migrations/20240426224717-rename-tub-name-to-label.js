'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn({
      tableName: 'tubs',
      schema: queryInterface.sequelize.options.dialectOptions.searchPath // Use configured schema
    }, 'name', 'label');
  },
  down: async (queryInterface) => {
    await queryInterface.renameColumn({
      tableName: 'tubs',
      schema: queryInterface.sequelize.options.dialectOptions.searchPath // Use configured schema
    }, 'label', 'name');
  }
};
