'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('shelves', 'name', 'label');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('shelves', 'label', 'name');
  }
};
