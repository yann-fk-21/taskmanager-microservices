const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_USER);
    console.log('[INFO] Successful connection to User DB');
  } catch (error) {
    console.log("[ERROR] User BD isn't available now, try later!");
  }
};

module.exports = connectDB;
