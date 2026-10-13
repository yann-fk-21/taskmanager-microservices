const Task = require('../models/task.model');
const { status } = require('http-status');

const getTasks = async (req, res) => {
  try {
    const tasks = Task.find();
    return res
      .status(status.OK)
      .json({ message: 'Getting successfully task', tasks: tasks });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching tasks', error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = Task.findById(taskId);

    if (!task) {
      return res.status(status.NOT_FOUND).json({ message: 'Task not found!' });
    }

    return res
      .status(status.OK)
      .json({ message: 'Getting successfully task', task: task });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching task', error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const taskData = req.body;
    const createdTask = Task.create(taskData);
    return res
      .status(status.CREATED)
      .json({ message: 'Task is created', task: createdTask });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error creating task', error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;
    const task = Task.findByIdAndUpdate(id, taskData);

    if (!task) {
      return res.status(status.NOT_FOUND).json({ message: 'Task not found!' });
    }

    const updatedTask = await Task.findById(taskId);

    return res
      .status(status.OK)
      .json({ message: `Task ${taskId} is updated`, task: updatedTask });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error updating task', error: error.message });
  }
};

const deletetask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(status.NOT_FOUND).json({ message: 'Task not found!' });
    }

    return res.status(status.OK).json({ message: `Task ${taskId} is deleted` });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = { getTasks, getTask, createTask, deletetask, updateTask };
