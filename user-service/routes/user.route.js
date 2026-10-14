const express = require('express');
const router = express.Router();
const { validateUserData } = require('../config/validator.config');

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require('../controllers/user.controller');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);

router.post('/', validateUserData, createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
