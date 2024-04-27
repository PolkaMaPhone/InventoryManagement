'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('tubs', 'name', 'label');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('tubs', 'label', 'name');
  }
};
