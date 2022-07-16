const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    priority:{
        type:String,
    },
    status:{
        type: String,
        required: true,
    },
    screenShot:{
        data: Buffer,
        contentType: String,
    },
    project: {
        type: ObjectId,
        ref: 'Project'
    },
    createdBy: {
        type: String,
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        require: true
    }
},{ timestamps: true })


module.exports = new mongoose.model('TaskSchema', taskSchema)