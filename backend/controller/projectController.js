const e = require("express");
const formidable = require("formidable");
const projectSchema = require("../schema/projectSchema");
const { responseMessages } = require("../utilities/responseMessage");
const fs = require("fs");
const _ = require("lodash");
const taskSchema = require("../schema/taskSchema");

exports.createProject = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      responseMessages(res, 400, false, "Something wrong with the file.");
    }
    const {
      title,
      description,
      client,
      budget,
      startDate,
      dueDate,
      developers,
    } = fields;
    if (
      !title ||
      !description ||
      !budget ||
      !startDate ||
      !dueDate ||
      !client
    ) {
      responseMessages(res, 400, false, "Please fill all the inputs.");
      return;
    }
    // Form data not coming in proper format, so changing into array of string format
    fields.developers = String(fields.developers).split(",") || [];
    fields.client = String(fields.client).split(",") || [];
    let project = new projectSchema(fields);
    project.status = "new";
    // handle file
    if (file.logo) {
      project.isLogoUploaded = true;
      if (file.logo.size > 3000000) {
        responseMessages(res, 400, false, "File Size is too big");
      }
      project.logo.data = fs.readFileSync(file.logo.filepath);
      project.logo.contentType = file.logo.type;
    }

    project.save((err, project) => {
      if (err) {
        responseMessages(res, 400, false, err);
        return;
      }
      responseMessages(res, 200, true, "Project added successfully.", project);
    });
  });
};

exports.getAllProject = (req, res) => {
  const limit = req.query.limit ? parseInt(res.query.limit) : 100;
  const sortBy = req.query.sortBy ? res.query.sortBy : "_id";
  projectSchema
    .find()
    .select("-logo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .populate("developers", "name")
    .populate("client", "name")
    .exec((err, projects) => {
      if (err) {
        responseMessages(res, 400, false, "No Project Found.");
        return;
      }
      responseMessages(
        res,
        200,
        true,
        "All projects fetched successfully",
        projects
      );
    });
};

exports.getSingleProject = async (req, res) => {
  req.project.logo = undefined;

  responseMessages(
    res,
    200,
    true,
    "Single project fetched successfully.",
    req.project
  );
};

exports.logo = (req, res, next) => {
  if (req.project.logo.data) {
    res.set("content-Type", req.project.logo.contentType);
    res.send(req.project.logo.data);
  } else {
    responseMessages(res, 400, false, "Image not found");
  }
  next();
};

exports.updateProject = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      responseMessages(res, 400, false, "Something went wrong.");
      return;
    }
    // Form data not coming in proper format, so changing into array of string format
    fields.developers = String(fields.developers).split(",") || [];
    fields.client = String(fields.client).split(",") || [];
    if (!fields.developers.length) {
      delete fields.developers;
    }

    // update product is happening here
    let project = req.project;
    project = _.extend(project, fields);

    if (file.logo) {
      if (file.logo.size > 3000000) {
        responseMessages(res, 400, false, "Updatetion of logo failed.");
        return;
      }
      project.logo.data = fs.readFileSync(file.logo.filepath);
      project.logo.contentType = file.logo.type;
    }

    project.save((err, project) => {
      if (err) {
        responseMessages(res, 400, false, "Unable to update project.");
        return;
      }
      responseMessages(
        res,
        200,
        true,
        "Project Updated successfully.",
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
        "Unable to delete project from Database."
      );
    } else {
      responseMessages(
        res,
        200,
        true,
        "Project deleted successfully.",
        deletedProject
      );
    }
  });
};

// funtions
exports.getProjectById = (req, res, next, id) => {
  projectSchema
    .findById(id)
    .populate({
      path: "tasks",
      populate: {
        path: "developers",
        select:'name -_id'
      },
    })
    .populate("client", "name")
    .exec((err, project) => {
      if (err) {
        responseMessages(res, 400, false, "No Project Found.");
      }
      req.project = project;
      next();
    });
};
