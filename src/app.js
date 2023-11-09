const express = require('express')
const app = express()
const router = express.Router()

// Route Variables
const userRouter = require('../routes/users')
const showRouter = require('../routes/shows')

// Middleware
app.use(express.json())
app.use(express.urlencoded())

// Route Handlers
app.use('/users', userRouter)
app.use('/shows', showRouter)


module.exports = app;