const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set!');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected ✅');
  } catch (err) {
    // Log the error but DO NOT exit — server must stay alive to send proper responses
    console.error('❌ DB Connection Error:', err.message);
    console.error('Server will continue running, but DB operations will fail.');
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;