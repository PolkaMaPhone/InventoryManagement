const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Group = sequelize.define('Group', {
    group_id: {
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
    }
}, {
    tableName: 'groups',
    timestamps: true
});

module.exports = Group;