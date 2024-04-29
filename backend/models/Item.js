const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Category = require('./Category');
const Group = require('./Group');
const Location = require('./Location');

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
            model: Category,
            key: 'category_id'
        }
    },
    group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: 'group_id'
        }
    },
    location_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Location,
            key: 'location_id'
        }
    },
    is_stored: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'items'
});

module.exports = Item;
