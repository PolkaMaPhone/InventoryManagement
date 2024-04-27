const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Item = sequelize.define('Item', {
    item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'category_id'
        }
    },
    is_stored: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    location_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Locations',
            key: 'location_id'
        }
    }
}, {
    tableName: 'items'
});

module.exports = Item;
