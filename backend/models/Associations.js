const Category = require('./Category');
const Group = require('./Group');
const Location = require('./Location');
const Item = require('./Item');
const Shelf = require('./Shelf');
const Tub = require('./Tub');

function applyAssociations(sequelize) {
    // Define associations between Category and Item
    Category.hasMany(Item, {
        foreignKey: 'category_id',
        as: 'items'
    });
    Item.belongsTo(Category, {
        foreignKey: 'category_id',
        as: 'category'
    });

    // Define associations between Group and Item
    Group.hasMany(Item, {
        foreignKey: 'group_id',
        as: 'items'
    });
    Item.belongsTo(Group, {
        foreignKey: 'group_id',
        as: 'group'
    });

    // Define associations between Shelf and Tub
    Shelf.hasMany(Tub, {
        foreignKey: 'shelf_id',
        as: 'tubs'
    });
    Tub.belongsTo(Shelf, {
        foreignKey: 'shelf_id',
        as: 'shelf'
    });

    // Define associations between Location and Tub
    Location.hasMany(Tub, {
        foreignKey: 'location_id',
        as: 'tubs'
    });
    Tub.belongsTo(Location, {
        foreignKey: 'location_id',
        as: 'location'
    });

    // Define associations between Location and Shelf
    Location.hasMany(Shelf, {
        foreignKey: 'location_id',
        as: 'shelves'
    });
    Shelf.belongsTo(Location, {
        foreignKey: 'location_id',
        as: 'location'
    });

    // Define associations between Location and Item
    Location.hasMany(Item, {
        foreignKey: 'location_id',
        as: 'items'
    });
    Item.belongsTo(Location, {
        foreignKey: 'location_id',
        as: 'location'
    });
}

module.exports = { applyAssociations };
