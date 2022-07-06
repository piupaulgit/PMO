const express = require('express');
const { createProject, getSingleProject, getAllProject, deleteProject, updateProject, getProjectById, logo } = require('../controller/projectController');
const { authenticateJWT } = require('../utilities/responseMessage');
const router = express.Router()

router.param("projectId", getProjectById);

router.post('/create', authenticateJWT, createProject)
router.get('/all', authenticateJWT, getAllProject)
router.get('/:projectId', authenticateJWT, getSingleProject)
router.delete('/:projectId', authenticateJWT, deleteProject)
router.put('/:projectId', authenticateJWT, updateProject)
router.get("/logo/:projectId", logo);

module.exports = router;