const mongoose = require('mongoose');

const connectBD = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_TASK);
    console.log('[INFO] Successful connection to Task DB');
  } catch (error) {
    console.log("[ERROR] Task BD isn't available now, try later!");
  }
};

module.exports = connectBD;
