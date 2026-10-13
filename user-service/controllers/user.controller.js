const User = require('../models/user.model');
const { status } = require('http-status');
const { hashPassword } = require('../config/crypt.config');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res
      .status(status.OK)
      .json({ message: 'Users fetched successfully', users });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching users', error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(status.NOT_FOUND).json({ message: 'user not found' });
    }

    return res.status(status.OK).json({ user: user });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching user', error: error.message });
  }
};

const createUser = async (req, res) => {
  user_data = req.body;

  try {
    const hashedUserPassord = await hashPassword(user_data.password);
    user_data.password = hashedUserPassord;
    const newUser = await User.create(user_data);
    return res
      .status(status.CREATED)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error creating user', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body);
    if (!updatedUser) {
      return res.status(status.NOT_FOUND).json({ message: 'User not found' });
    }

    const newUser = await User.findOne({ _id: userId }).exec();
    return res
      .status(status.OK)
      .json({ message: 'User updated successfully', user: newUser });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error update user', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(status.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    return res.status(status.OK).json({
      message: 'User deleted successfully',
      userID: userId,
    });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
