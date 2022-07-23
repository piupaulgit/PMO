const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        require: true
    },
    isLogoUploaded : {
        type: Boolean,
        default: false
    },
    logo:{
        data: Buffer,
        contentType: String,
    },
    developers: [{ 
        type : mongoose.Schema.ObjectId, 
        ref: 'User',
        required: false
    }],
    client: [{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User' 
    }],
    tasks: {
        type: Array,
        default: []
    },
    taskDetails: {
        type:Array
    }
},{ timestamps: true })


module.exports = new mongoose.model('ProjectSchema', projectSchema)