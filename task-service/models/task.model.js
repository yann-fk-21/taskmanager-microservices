const mongoose = require('mongoose');

const { Schema } = mongoose;

// const UserSchema = new Schema({
//    user_id: mongoose.Types.ObjectId,
// });

// const User = mongoose.model('User', UserSchema);

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, 'title is required!'],
    },

    description: {
      type: String,
      require: [true, 'description is required'],
    },

    is_done: {
      type: Boolean,
      default: false,
    },

    user_id: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Task', TaskSchema);
