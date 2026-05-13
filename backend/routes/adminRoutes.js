const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Auth middleware (basic)
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Setup Initial Admin
router.post('/setup', async (req, res) => {
  try {
    const count = await User.count();
    if (count > 0) return res.status(400).json({ message: 'Already setup' });
    
    const user = await User.create({
      name: 'Admin',
      email: 'admin@lawyer.com',
      password: 'password123'
    });
    res.status(201).json({ message: 'Admin created', email: user.email, password: 'password123' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get all appointments
router.get('/appointments', protect, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ order: [['createdAt', 'DESC']] });
    res.json(appointments);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Update appointment status
router.patch('/appointments/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    
    appointment.status = status;
    await appointment.save();
    
    res.json({ message: 'Status updated', data: appointment });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
