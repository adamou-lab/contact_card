const User = require('../Models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
    try {
        // const {name, email, password} = req.body

        // const salt = bcrypt.genSaltSync(10)
        // const newPassword = bcrypt.hashSync(password, salt)

        const user = await User.create({...req.body})

        const token = jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRE})

        res.json({user, token})

        
    } catch (error) {
        res.status(500).send(error)
        
    }

}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).send("User does not exist")
        }

        if(!email || !password){
            return res.status(404).send("Please enter your email and password")
        }
        const isValid = bcrypt.compareSync(password, user.password)

        if(!isValid){
            return res.status(404).send("Wrong password")
        }

        const token = jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRE})


        res.status(201).json({userId:user._id, name: user.name, token: token})

        
    } catch (error) {
        res.status(500).send(error)
        
    }


}



module.exports = {
    registerUser,
    login
}