const express = require('express')
const app = express()
require('dotenv').config()

const connectDB = require('./db/connection')
const authRouter = require('./routes/auth')
const contactRouter = require('./routes/contact')
const authMiddleWare = require('./Middlewares/authorization')

const cors = require('cors')
const xxs = require('xxs-clean')
const helmet = require('helmet')
const rateLimiter = require('express-rate-limit')

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(xxs())
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowsM: 15 * 1000* 60,
        max: 100
    })
)




app.use('/api/v1/auth', authRouter)
app.use('/api/v1/contact', authMiddleWare, contactRouter)


const port = 3000 || process.env.PORT


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`App is listening at port ${port}....`))
        
    } catch (error) {
        console.log(error)
        
    }

}

start()