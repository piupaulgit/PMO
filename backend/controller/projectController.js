const e = require('express');
const formidable = require('formidable');
const projectSchema = require('../schema/projectSchema');
const { responseMessages } = require('../utilities/responseMessage');
const fs = require('fs');
const _ = require("lodash");

exports.createProject = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            responseMessages(res, 400, false, 'Something wrong with the file.');
        }
        const { title, description, client, budget, startDate, dueDate } =
            fields;
        if (
            !title ||
            !description ||
            !client ||
            !budget ||
            !startDate ||
            !dueDate 
        ) {
            responseMessages(res, 400, false, 'Please fill all the inputs.');
        }
        let project = new projectSchema(fields);
        project.status = 'new'
        // handle file
        if (file.logo) {
            project.isLogoUploaded = true
            if (file.logo.size > 3000000) {
                responseMessages(res, 400, false, 'File Size is too big');
            }
            project.logo.data = fs.readFileSync(file.logo.filepath);
            project.logo.contentType = file.logo.type;
        }

        project.save((err, project) => {
            if (err) {
                responseMessages(res, 400, false, err);
            }
            responseMessages(
                res,
                200,
                true,
                'Project added successfully.',
                project
            );
        });
    });
};

exports.getAllProject = (req, res) => {
    const limit = req.query.limit ? parseInt(res.query.limit) : 100;
    const sortBy = req.query.sortBy ? res.query.sortBy : '_id';
    projectSchema
        .find()
        .select('-logo')
        .sort([[sortBy, 'asc']])
        .limit(limit)
        .exec((err, projects) => {
            if (err) {
                responseMessages(res, 400, false, 'No Project Found.');
            }
            responseMessages(
                res,
                200,
                true,
                'All projects fetched successfully',
                projects
            );
        });
};

exports.getSingleProject = (req, res) => {
    req.project.logo = undefined;
    responseMessages(res, 200, true, "Single project fetched successfully.", req.project);
};

exports.logo = (req, res, next) => {
    if (req.project.logo.data) {
      res.set("content-Type", req.project.logo.contentType);
      res.send(req.project.logo.data)
    }else{
        responseMessages(res, 400, false, 'Image not found')
    }
    next();
  };

exports.updateProject = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            responseMessages(res, 400, false, 'Something went wrong.');
        }

        // update product is happening here
        let project = req.project;
        project = _.extend(project, fields);

        if (file.logo) {
            if (file.logo.size > 3000000) {
                responseMessages(res, 400, false, 'Updatetion of logo failed.');
            }
            project.logo.data = fs.readFileSync(file.logo.filepath);
            project.logo.contentType = file.logo.type;
        }

        project.save((err, project) => {
            if (err) {
                responseMessages(res, 400, false, 'Unable to update project.');
            }
            responseMessages(
                res,
                200,
                true,
                'Project Updated successfully.',
                project
            );
        });
    });
};

exports.deleteProject = (req, res) => {
    const project = req.project;
    project.remove((error, deletedProject) => {
        if (error) {
            responseMessages(
                res,
                400,
                false,
                'Unable to delete project from Database.'
            );
        } else {
            responseMessages(
                res,
                200,
                true,
                'Project deleted successfully.',
                deletedProject
            );
        }
    });
};

// funtions
exports.getProjectById = (req, res, next, id) => {
    projectSchema.findById(id).exec((err, project) => {
        if (err) {
            responseMessages(res, 400, false, 'No Project Found.');
        }
        req.project = project;
        next();
    });
};
