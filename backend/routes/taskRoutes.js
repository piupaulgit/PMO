const express = require('express');
const { getProjectById } = require('../controller/projectController');
const { createTask, getTasksByProject, getProjectTasks } = require('../controller/taskController');
const router = express.Router()

router.param("projectIdFortask", getTasksByProject);

router.post('/create', createTask)
// router.post('/projectIdFortask', updateTask)
router.get('/project/:projectIdFortask', getProjectTasks)
module.exports = router;