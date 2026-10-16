const Task = require('../models/task.model');
const { status } = require('http-status');
<<<<<<< HEAD
const { getUserById } = require('../utils/utils');
=======
const { getUserById, checkAuthorization } = require('../utils/utils');
>>>>>>> 1c3b474 (feat: add api gateway)

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

const getTasksByUserId = async (req, res) => {
  try {
<<<<<<< HEAD
=======
    const token = req.headers.authorization?.split(' ')[1];
>>>>>>> 1c3b474 (feat: add api gateway)
    const user_id = req.params.id;
    const fetchedUser = await getUserById(user_id);

    if (!fetchedUser) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: 'User not found', tasks: [] });
    }

<<<<<<< HEAD
=======
    checkAuthorization(res, token);

>>>>>>> 1c3b474 (feat: add api gateway)
    const userTasks = await Task.find().where({ user_id: user_id }).exec();
    return res
      .status(status.OK)
      .json({ message: "Getting successfully user's tasks", tasks: userTasks });
  } catch (error) {
    return res
      .status(
        error.statusCode == status.BAD_GATEWAY
          ? status.BAD_GATEWAY
          : status.INTERNAL_SERVER_ERROR,
      )
      .json({ message: "Error getting user's tasks", error: error.message });
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
<<<<<<< HEAD
=======
    const token = req.headers.authorization?.split(' ')[1];
>>>>>>> 1c3b474 (feat: add api gateway)
    const { user_id } = req.body;
    const fetchedUser = await getUserById(user_id);

    if (!fetchedUser) {
      return res.status(status.NOT_FOUND).json({ message: 'User not found!' });
    }

<<<<<<< HEAD
=======
    checkAuthorization(res, token);

>>>>>>> 1c3b474 (feat: add api gateway)
    const taskData = req.body;
    const createdTask = await Task.create(taskData);
    return res
      .status(status.CREATED)
      .json({ message: 'Task is created', task: createdTask });
  } catch (error) {
    return res
      .status(
        error.statusCode === status.BAD_GATEWAY
          ? status.BAD_GATEWAY
          : status.INTERNAL_SERVER_ERROR,
      )
      .json({ message: 'Error creating task', error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
<<<<<<< HEAD
    const taskId = req.params.id;
    const taskData = req.body;
    const task = await Task.findByIdAndUpdate(id, taskData);

=======
    const token = req.headers.authorization?.split(' ')[1];
    const taskId = req.params.id;
    const taskData = req.body;

    checkAuthorization(res, token);

    const task = await Task.findByIdAndUpdate(taskId, taskData);
>>>>>>> 1c3b474 (feat: add api gateway)
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
<<<<<<< HEAD
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

=======
    const token = req.headers.authorization?.split(' ')[1];
    const taskId = req.params.id;

    checkAuthorization(res, token);

    const deletedTask = await Task.findByIdAndDelete(taskId);
>>>>>>> 1c3b474 (feat: add api gateway)
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

module.exports = {
  getTasks,
  getTask,
  getTasksByUserId,
  createTask,
  deletetask,
  updateTask,
};
