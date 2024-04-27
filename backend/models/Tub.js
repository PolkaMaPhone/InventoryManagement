const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Tub = sequelize.define('Tub', {
    tub_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shelf_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Shelves',
            key: 'shelf_id'
        },
        allowNull: false
    },
    location_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Locations',
            key: 'location_id'
        }
    }
    // add a derived value which represents the number of items that are stored in the tub
    // this value should be calculated by counting the number of items that have a tub_id that matches the tub_id of this tub
    // this value should be read-only
    /*
    num_items: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.getItems().length;
        }
    }
    */
}, {
    tableName: 'tubs'
});

module.exports = Tub;
