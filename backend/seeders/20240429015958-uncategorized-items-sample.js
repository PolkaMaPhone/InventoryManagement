'use strict';

async function createUncategorizedItems(queryInterface, db_schema) {
  const items = [];
  for (let i = 1; i <= 3; i++) {
    items.push({
      name: `Uncategorized Item ${i}`,
      description: `Description for Uncategorized Item ${i}`,
      category_id: null,
      group_id: null,
      location_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  await queryInterface.bulkInsert({ tableName: 'items', schema: db_schema }, items);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const db_schema = process.env.SCHEMA;
    await createUncategorizedItems(queryInterface, db_schema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('items', null, {});
  }
};