const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Shelf = sequelize.define('Shelf', {
    shelf_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Locations',
            key: 'location_id'
        }
    }
}, {
    tableName: 'shelves'
});

module.exports = Shelf;
