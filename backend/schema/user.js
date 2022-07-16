const mongoose = require('mongoose')
const model = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    }
})

module.exports = new mongoose.model('User', model)