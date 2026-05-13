const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PracticeArea = sequelize.define('PracticeArea', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  shortDescription: { type: DataTypes.TEXT },
  content: { type: DataTypes.TEXT('long') },
  icon: { type: DataTypes.STRING }, // icon name or image url
  image: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' }
});

module.exports = PracticeArea;
