const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.get('/users/:id', taskController.getTasksByUserId);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deletetask);

module.exports = router;
