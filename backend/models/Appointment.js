const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Appointment = sequelize.define('Appointment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  clientName: { type: DataTypes.STRING, allowNull: false },
  clientEmail: { type: DataTypes.STRING, allowNull: false },
  clientPhone: { type: DataTypes.STRING, allowNull: false },
  practiceArea: { type: DataTypes.STRING },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  timeSlot: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER, defaultValue: 30 }, // in minutes
  purpose: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'), defaultValue: 'pending' },
  googleEventId: { type: DataTypes.STRING }
});

module.exports = Appointment;
