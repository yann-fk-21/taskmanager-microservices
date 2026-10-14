const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Schema } = mongoose;

const AuthSchema = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },

  token: {
    type: String,
    required: true,
  },
});

AuthSchema.methods.generateTokenAndSave = async function () {
  const token = jwt.sign({ user_id: this.user_id }, process.env.JWT_SECRET, {
    expiresIn: '5h',
  });
  this.token = token;
  await this.save();
  return token;
};

module.exports = mongoose.model('Auth', AuthSchema);
