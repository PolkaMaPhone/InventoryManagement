const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ItemHistory = sequelize.define('ItemHistory', {
    item_history_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Items',
            key: 'item_id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'item_history'
});

module.exports = ItemHistory;
