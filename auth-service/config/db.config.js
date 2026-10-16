const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect(process.env.MONGO_DB_USER);
    console.log('[INFO] Successful connection to User DB');
  } catch (error) {
    console.log("[ERROR] User BD isn't available now, try later!");
=======
    await mongoose.connect(process.env.MONGO_DB_AUTH);
    console.log('[INFO] Successful connection to Auth DB');
  } catch (error) {
    console.log("[ERROR] Auth DB isn't available now, try later!");
>>>>>>> 1c3b474 (feat: add api gateway)
  }
};

module.exports = connectDB;
