'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    const tables = ['categories', 'groups', 'item_history', 'items', 'locations', 'shelves', 'transactions', 'tubs']; // Add the names of your tables here

    const addTimestampsPromises = tables.map((table) => {
      return Promise.all([
        queryInterface.addColumn(table, 'createdAt', {
          allowNull: false,
          type: Sequelize.DATE,
        }),
        queryInterface.addColumn(table, 'updatedAt', {
          allowNull: false,
          type: Sequelize.DATE,
        }),
      ]);
    });

    return Promise.all(addTimestampsPromises);
  },
  down: (queryInterface, Sequelize) => {
    const tables = ['categories', 'groups', 'item_history', 'items', 'locations', 'shelves', 'transactions', 'tubs']; // Add the names of your tables here

    const removeTimestampsPromises = tables.map((table) => {
      return Promise.all([
        queryInterface.removeColumn(table, 'createdAt'),
        queryInterface.removeColumn(table, 'updatedAt'),
      ]);
    });

    return Promise.all(removeTimestampsPromises);
  },
};
