const express = require('express');
const router = express.Router();
const PracticeArea = require('../models/PracticeArea');
const Testimonial = require('../models/Testimonial');
const BlogPost = require('../models/BlogPost');
const Setting = require('../models/Setting');
const ContactMessage = require('../models/ContactMessage');
const Appointment = require('../models/Appointment');

// Get all active practice areas
router.get('/practice-areas', async (req, res) => {
  try {
    const areas = await PracticeArea.findAll({ where: { status: 'active' } });
    res.json(areas);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get single practice area by slug
router.get('/practice-areas/:slug', async (req, res) => {
  try {
    const area = await PracticeArea.findOne({ where: { slug: req.params.slug, status: 'active' } });
    if (!area) return res.status(404).json({ message: 'Not found' });
    res.json(area);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await Setting.findAll();
    res.json(settings);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const items = await Testimonial.findAll({ where: { status: 'active' } });
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get blog posts
router.get('/blog', async (req, res) => {
  try {
    const posts = await BlogPost.findAll({ where: { status: 'published' }, order: [['createdAt', 'DESC']] });
    res.json(posts);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/blog/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ where: { slug: req.params.slug, status: 'published' } });
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Submit contact form
router.post('/contact', async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Submit appointment request
router.post('/book-appointment', async (req, res) => {
  try {
    const { name, email, phone, practiceArea, otherPracticeArea, date, time, description } = req.body;
    
    const finalPracticeArea = practiceArea === 'other' ? otherPracticeArea : practiceArea;
    
    // Parse DD/MM/YYYY to YYYY-MM-DD
    let dbDate = date;
    if (date && date.includes('/')) {
      const [day, month, year] = date.split('/');
      dbDate = `${year}-${month}-${day}`;
    }
    
    const appointment = await Appointment.create({
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      practiceArea: finalPracticeArea,
      date: dbDate,
      timeSlot: time,
      purpose: description
    });
    
    res.status(201).json({ message: 'Appointment requested successfully', data: appointment });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
