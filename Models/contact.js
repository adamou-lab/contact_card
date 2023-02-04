const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 20,
        require: [true, "Please provide your name"],
        unique: true
    },
    phone: {
        type: String,
        maxLength: 11,
        minLength: 11,
        unique: true,
        require: [true, "Please provide your phone number"],

    },
    email: {
        type: String,
        unique: true,
        match: /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    },
    address: {
        type: String,
    },
    occupation: {
        type: String,
    },
    image: {
        type: String

    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
    

}, {timestamps: true})

module.exports = mongoose.model('Card', contactSchema)