const taskSchema = require('../schema/taskSchema');
const { responseMessages } = require('../utilities/responseMessage');
const formidable = require('formidable');
const fs = require('fs');
const projectSchema = require('../schema/projectSchema');

exports.createTask = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            responseMessages(res, 400, false, 'Something wrong with the file.');
        }
        const { title, description, priority = 'low', dueDate, status = 'new', project } =
            fields;
        if (
            !title ||
            !description ||
            !priority ||
            !dueDate || 
            !status ||
            !project
        ) {
            responseMessages(res, 400, false, 'Please fill all the inputs.');
        }
        let task = new taskSchema(fields);
        task.priority =  task.priority ? task.priority : 'low';
        task.status = task.status ? task.status : 'new';

        
        // handle file
        if (file.screenShot) {
            if (file.screenShot.size > 3000000) {
                responseMessages(res, 400, false, 'File Size is too big');
            }
            task.screenShot.data = fs.readFileSync(file.screenShot.filepath);
            task.screenShot.contentType = file.screenShot.type;
        }

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

exports.getTasksByProject = (req,res,next,projectId) => {
    taskSchema.find({"project": projectId})
    .exec((err, task) => {
      if (err) {
        return res.status(400).json({
          error: "task not found",
        });
      }
      req.task = task;
      next();
    });
  }

  exports.getProjectTasks = (req,res) => {
    if(req.task){
        responseMessages(res, 200, true, 'Tasks loaded successfully.',req.task);
    }
    else{
        responseMessages(res, 400, false, 'Something went wrong.');
    }
  }

  exports.updateTask = (req,res) => {
    
  }
  
  