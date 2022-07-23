const express = require('express');
const { createProject, getSingleProject, getAllProject, deleteProject, updateProject, getProjectById, logo } = require('../controller/projectController');
const { authenticateJWT } = require('../utilities/responseMessage');
const router = express.Router()

router.param("projectId", getProjectById);

router.post('/create', createProject)
router.get('/all', getAllProject)
router.get('/:projectId', getSingleProject)
router.delete('/:projectId', deleteProject)
router.put('/:projectId', updateProject)
router.get("/logo/:projectId", logo);

module.exports = router;