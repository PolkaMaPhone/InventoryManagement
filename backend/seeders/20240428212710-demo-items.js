'use strict';

async function createItems(queryInterface, db_schema) {
  const categories = await queryInterface.sequelize.query(
    `SELECT category_id FROM "${db_schema}".categories`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );
  const groups = await queryInterface.sequelize.query(
    `SELECT group_id FROM "${db_schema}".groups`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );
  const locations = await queryInterface.sequelize.query(
    `SELECT location_id FROM "${db_schema}".locations`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  const items = [];
  for (const category of categories) {
    for (const group of groups) {
      for (const location of locations) {
        if (category.category_id && group.group_id && location.location_id) {
          items.push({
            name: `Sample Item ${category.category_id}${group.group_id}${location.location_id}`,
            description: `Description for Sample Item ${category.category_id}-${group.group_id}-${location.location_id}`,
            category_id: category.category_id,
            group_id: group.group_id,
            location_id: location.location_id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
    }
  }

  await queryInterface.bulkInsert({ tableName: 'items', schema: db_schema }, items);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const db_schema = process.env.SCHEMA; // Replace 'DB_SCHEMA' with the actual environment variable name

    await queryInterface.bulkInsert({ tableName: 'categories', schema: db_schema }, [{
      name: 'Sample Category 1',
      description: 'Description for Sample Category 1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Sample Category 2',
      description: 'Description for Sample Category 2',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // Insert sample groups data
    await queryInterface.bulkInsert({ tableName: 'groups', schema: db_schema }, [{
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
      //group_id: 0,
      name: 'Ungrouped',
      description: 'This item does not belong to any specific group.',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // insert sample locations data
    await queryInterface.bulkInsert({ tableName: 'locations', schema: db_schema }, [{
      location_id: 1,
      shelf_id: 1,
      tub_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      location_id: 2,
      shelf_id: 2,
      tub_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      location_id: 3,
      shelf_id: 1,
      tub_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      location_id: 4,
      shelf_id: 2,
      tub_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // represent an uncategorized location with id 0
      location_id: 0,
      shelf_id: 0,
      tub_id: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // insert sample shelves data
    await queryInterface.bulkInsert({ tableName: 'shelves', schema: db_schema }, [{
      label: 'Shelf 1',
      location_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Shelf 2',
      location_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // represent an uncategorized shelf with id 0
      location_id: 0,
      label: 'Uncategorized',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // insert sample tubs data
    await queryInterface.bulkInsert({ tableName: 'tubs', schema: db_schema }, [{
      label: 'Tub 1',
      shelf_id: 1,
      location_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      label: 'Tub 2',
      shelf_id: 2,
      location_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await createItems(queryInterface, db_schema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('items', null, {});
    await queryInterface.bulkDelete('locations', null, {});
    await queryInterface.bulkDelete('tubs', null, {});
    await queryInterface.bulkDelete('shelves', null, {});
    await queryInterface.bulkDelete('groups', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  }
};
