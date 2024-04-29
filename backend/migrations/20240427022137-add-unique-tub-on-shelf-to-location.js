'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('locations', {
      fields: ['tub_id'],
      type: 'unique',
      name: 'unique_tub_on_shelf'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('locations', 'unique_tub_on_shelf');
  }
};