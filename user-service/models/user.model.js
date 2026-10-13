const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      require: [true, 'email is required'],
    },
    password: {
      type: String,
      require: [true, 'password is required!'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchema);
