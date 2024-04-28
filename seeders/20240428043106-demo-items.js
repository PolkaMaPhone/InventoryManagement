'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Categories', [{
      name: 'Sample Category 1',
      description: 'Description for Sample Category 1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Sample Category 2',
      description: 'Description for Sample Category 2',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('Groups', [{
      name: 'Sample Group 1',
      description: 'Description for Sample Group 1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Sample Group 2',
      description: 'Description for Sample Group 2',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // represent an uncategorized group with id 0
      category_id : 0,
      name: 'Ungrouped',
      description: 'This item does not belong to any specific group.',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // insert sample shelves data
    await queryInterface.bulkInsert('Shelves', [{
      name: 'Sample Shelf 1',
      label: 'Shelf 1',
      location_id : 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Sample Shelf 2',
      label: 'Shelf 2',
      location_id : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // represent an uncategorized shelf with id 0
      location_id : 0,
      name: 'Uncategorized',
      label: 'This shelf does not yet have a location.',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // insert sample tubs data
    await queryInterface.bulkInsert('Tubs', [{
      name: 'Sample Tub 1',
      label: 'Tub 1',
      shelf_id : 1,
      location_id : 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Sample Tub 2',
      label: 'Tub 2',
      shelf_id : 2,
      location_id : 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // represent an uncategorized tub with id 0
      shelf_id : 0,
      location_id : 0,
      name: 'Uncategorized',
      label: 'This tub does not yet have a location.',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // insert sample locations data
    await queryInterface.bulkInsert('Locations', [{
      location_id : 1,
      shelf_id : 1,
      tub_id : null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      location_id : 2,
      shelf_id : 2,
      tub_id : null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      location_id : 3,
      shelf_id : 1,
      tub_id : 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      location_id : 4,
      shelf_id : 2,
      tub_id : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // represent an uncategorized location with id 0
      location_id : 0,
      shelf_id : 0,
      tub_id : 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const groups = await queryInterface.sequelize.query(
      'SELECT id FROM Groups',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const locations = await queryInterface.sequelize.query(
      'SELECT id FROM Locations',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const items = [];
    for (const category of categories) {
      for (const group of groups) {
      for (const location of locations) {
        items.push({
        name: `Sample Item ${category.id}-${group.id}-${location.id}`,
        description: `Description for Sample Item ${category.id}-${group.id}-${location.id}`,
        category_id: category.id,
        group_id: group.id,
        location_id: location.id,
        createdAt: new Date(),
        updatedAt: new Date()
        });
      }
      }
    }

    await queryInterface.bulkInsert('Items', items, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {});
    await queryInterface.bulkDelete('Locations', null, {});
    await queryInterface.bulkDelete('Tubs', null, {});
    await queryInterface.bulkDelete('Shelves', null, {});
    await queryInterface.bulkDelete('Groups', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
