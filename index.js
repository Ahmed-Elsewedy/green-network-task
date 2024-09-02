require('dotenv').config()
require('./config/db.config')

const cors = require('cors')
const helmet = require("helmet");
const express = require('express')

const httpStatusText = require('./utils/httpStatusText')
const userRouter = require('./routes/user.routes')
const bookRouter = require('./routes/book.routes')

const swagger = require('./config/swagger.config')

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet());

swagger(app)

app.get('/', (req, res) => {
    res.json('success test api')
})

// routes
app.use('/users', userRouter)
app.use('/books', bookRouter)

app.all('*', (req, res) => {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'this resource is not available' })
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null });
})

if (process.env.NODE_ENV !== 'test')
    app.listen(process.env.PORT || 3000, () => {
        console.log(`listening on ${process.env.PORT || 3000}`)
    })

module.exports = app