const mongoose = require('mongoose');

const { Schema } = mongoose;

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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Task', TaskSchema);
