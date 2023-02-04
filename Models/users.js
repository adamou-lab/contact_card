const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name"],
        minLength: 3,

    },
    email: {
        type: String,
        required: [true, "Please provide the email"],
        unique: true,
        match: /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    },
    password: {
        type: String,
        required: [true, "Please provide the password"],
        minLength: 5

    }
})

userSchema.pre('save', async function (next) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    next()
    
})


module.exports = mongoose.model('User', userSchema)

