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
    type: {
        type: String,
        required: true,
        default:'task'
    },
    priority:{
        type:String,
        default: 'low'
    },
    screenShot:{
        data: Buffer,
        contentType: String,
    },
    project: {
        type: ObjectId,
        ref: 'Project'
    },
    developers: [{ 
        type : ObjectId, 
        ref: 'User',
        default: [],
        required: false
    }],
    createdBy: {
        type: String,
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        require: true,
        default: 'new'
    }
},{ timestamps: true })


module.exports = new mongoose.model('TaskSchema', taskSchema)