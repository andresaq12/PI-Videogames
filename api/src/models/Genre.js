const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('genre', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  },
    {
      timestamps: false
    })
}
