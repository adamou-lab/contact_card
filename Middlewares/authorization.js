const jwt = require('jsonwebtoken')


const authMiddleWare = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            res.status(401).send("You are not allowed to access this content")
        }
        const authToken = authHeader.split(' ')[1]

        const payload = jwt.verify(authToken, process.env.JWT_SECRET)

        req.user = {...payload}

        next()
        
    } catch (error) {
        
    }
}

module.exports = authMiddleWare

