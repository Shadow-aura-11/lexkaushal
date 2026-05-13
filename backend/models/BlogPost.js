const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BlogPost = sequelize.define('BlogPost', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  content: { type: DataTypes.TEXT('long') },
  excerpt: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
  author: { type: DataTypes.STRING, defaultValue: 'Admin' },
  status: { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'draft' }
});

module.exports = BlogPost;
