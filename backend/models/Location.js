const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Location = sequelize.define('Location', {
    location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tub_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    shelf_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'locations',
    timestamps: true
});

module.exports = Location;
