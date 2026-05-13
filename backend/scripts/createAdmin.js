const { sequelize } = require('../config/db');
const User = require('../models/User');
require('dotenv').config({ path: '../.env' });

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    // Sync models
    await sequelize.sync();

    const email = 'admin@lawyer.com';
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      console.log('ℹ️ Admin user already exists.');
      process.exit(0);
    }

    await User.create({
      name: 'Admin',
      email: email,
      password: 'password123'
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@lawyer.com');
    console.log('🔑 Password: password123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:');
    if (error.code === 'ECONNREFUSED') {
      console.error('   DATABASE ERROR: Could not connect to MySQL. Is XAMPP/WAMP running?');
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
};

createAdmin();
