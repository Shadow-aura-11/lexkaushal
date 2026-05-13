const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./config/db');

// Import Models
const User = require('./models/User');
const PracticeArea = require('./models/PracticeArea');
const Setting = require('./models/Setting');
const Testimonial = require('./models/Testimonial');
const BlogPost = require('./models/BlogPost');
const ContactMessage = require('./models/ContactMessage');
const Appointment = require('./models/Appointment');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Setup Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));


// Connect to DB and Sync
connectDB().then(() => {
  sequelize.sync({ alter: true }).then(async () => {
    console.log('Database Synced');
    
    // Auto-create admin if not exists
    try {
      const adminExists = await User.findOne({ where: { email: 'admin@lawyer.com' } });
      if (!adminExists) {
        await User.create({
          name: 'Admin',
          email: 'admin@lawyer.com',
          password: 'password123'
        });
        console.log('👤 Default Admin Created: admin@lawyer.com / password123');
      }
    } catch (err) {
      console.error('Error checking/creating admin:', err);
    }
  }).catch(err => {
    console.error('Failed to sync database:', err);
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('❌ Server Error:', err);
});
