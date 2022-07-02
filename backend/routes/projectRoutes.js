const express = require('express');
const { createProject, getSingleProject, getAllProject, deleteProject, updateProject, getProjectById } = require('../controller/projectController');
const router = express.Router()

router.param("projectId", getProjectById);

router.post('/create', createProject)
router.get('/all', getAllProject)
router.get('/:projectId', getSingleProject)
router.delete('/:projectId', deleteProject)
router.put('/:projectId', updateProject)

module.exports = router;