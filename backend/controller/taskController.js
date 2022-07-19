const taskSchema = require('../schema/taskSchema');
const { responseMessages } = require('../utilities/responseMessage');
const formidable = require('formidable');
const fs = require('fs');
const projectSchema = require('../schema/projectSchema');
const _ = require('lodash');

exports.createTask = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            responseMessages(res, 400, false, 'Something wrong with the file.');
        }
        const { title, description, type = 'task', priority = 'low', dueDate, status = 'new', project } =
            fields;
        if (
            !title ||
            !description ||
            !priority ||
            !dueDate || 
            !status ||
            !type ||
            !project
        ) {
            responseMessages(res, 400, false, 'Please fill all the inputs.');
        }
        let task = new taskSchema(fields);
        task.priority =  task.priority ? task.priority : 'low';
        task.status = task.status ? task.status : 'new';

        
        // handle file
        // if (file.screenShot) {
        //     if (file.screenShot.size > 3000000) {
        //         responseMessages(res, 400, false, 'File Size is too big');
        //     }
        //     task.screenShot.data = fs.readFileSync(file.screenShot.filepath);
        //     task.screenShot.contentType = file.screenShot.type;
        // }

        // insert the task under the project
        projectSchema.find({"_id": project}).exec((err, project) => {
            project[0].tasks.push(task._id)
            project[0].save((err,project) => {
                console.log(project[0])
            })
        })

        task.save((err, task) => {
            if (err) {
                responseMessages(res, 400, false, err);
            }
            responseMessages(
                res,
                200,
                true,
                'Task added successfully.',
                task
            );
        });
    });
}

exports.deleteTask = (req,res) => {
    const task = req.task;
    task.remove((error, deletedTask) => {
        if (error) {
            responseMessages(
                res,
                400,
                false,
                'Unable to delete task from Database.'
            );
        } else {
            projectSchema.find({ _id: task.project.toString() }).exec((err, project) => {
                project[0].tasks.filter( (projectTaskId,index) => {
                    if(projectTaskId.toString() === task._id.toString()){
                        project[0].tasks.splice(index,1)
                    }
                })
                project[0].save((err,project) => {
                    if(err){
                        // todo
                    }
                })  
            })
            responseMessages(
                res,
                200,
                true,
                'Task deleted successfully.',
                deletedTask
            );
        }
    });
}

exports.updateTask = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            responseMessages(res, 400, false, 'Something went wrong.');
        }
        
        // update product is happening here
        let task = req.task;
        task = _.extend(task, fields);

        // if (file.screenShot) {
        //     if (file.screenShot.size > 3000000) {
        //         responseMessages(res, 400, false, 'Updatetion of screenShot failed.');
        //     }
        //     task.screenShot.data = fs.readFileSync(file.screenShot.filepath);
        //     task.screenShot.contentType = file.screenShot.type;
        // }

        task.save((err, updatedTask) => {
            if (err) {
                responseMessages(res, 400, false, 'Unable to update task.');
            }
            responseMessages(
                res,
                200,
                true,
                'task Updated successfully.',
                updatedTask
            );
        });
    });
}

exports.getTaskById = (req, res, next, id) => {
    taskSchema.findById(id).exec((err, task) => {
        if (err) {
            responseMessages(res, 400, false, 'No task Found.');
        }
        req.task = task;
        next();
    });
}