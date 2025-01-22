const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const env = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoUrl = env.ENV === 'test' ? env.MONGODB_URI_TEST : env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(mongoUrl).then(() => {
  logger.info('connected to MongoDB')
}).catch((error) => {
  logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to the API')
})

app.use('/api/login', loginRouter)

app.use(middleware.tokenExtractor, blogRouter)
app.use(middleware.userExtractor, blogRouter)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app