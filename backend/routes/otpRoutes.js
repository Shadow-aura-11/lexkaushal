const express = require('express');
const router = express.Router();
const OTP = require('../models/OTP');
const { Op } = require('sequelize');

// Send OTP (Mock)
router.post('/send', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone is required' });

    // Generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // Save to DB
    await OTP.create({ phone, code, expiresAt });

    // MOCK: Log to console since we don't have an SMS gateway API key
    console.log(`\n-----------------------------------------`);
    console.log(`📱 OTP for ${phone}: ${code}`);
    console.log(`-----------------------------------------\n`);

    res.json({ message: 'OTP sent successfully (Mock)', phone });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify OTP
router.post('/verify', async (req, res) => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code) return res.status(400).json({ message: 'Phone and code are required' });

    const otpRecord = await OTP.findOne({
      where: {
        phone,
        code,
        expiresAt: { [Op.gt]: new Date() },
        verified: false
      },
      order: [['createdAt', 'DESC']]
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    otpRecord.verified = true;
    await otpRecord.save();

    res.json({ message: 'Phone verified successfully', success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
