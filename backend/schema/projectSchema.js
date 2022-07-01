const mongoose = require('mongoose')
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
    client: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    logo:{
        data: Buffer,
        contentType: String,
    }
},{ timestamps: true })


module.exports = new mongoose.model('ProjectSchema', projectSchema)