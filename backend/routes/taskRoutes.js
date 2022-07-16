const express = require('express');
const { createTask, getTaskById, updateTask, deleteTask } = require('../controller/taskController');
const router = express.Router()
router.param('taskId', getTaskById)

router.post('/create', createTask)
router.put('/:taskId', updateTask)
router.delete('/:taskId', deleteTask)

module.exports = router;