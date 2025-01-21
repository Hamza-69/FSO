const userRouter = require('express').Router()
const User = require('./../models/user')
const bcrypt = require('bcrypt')
userRouter.get('/', async (request, response) => {
  const blogs = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(blogs)
})

userRouter.post('/', async (request, response) => {
  let { username, name, password } = request.body
  if (!password) {
    return response.status(400).json({ error: 'password missing' })
  }
  if (!username) {
    return response.status(400).json({ error: 'username missing' })
  }
  if (password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }
  if (username.length < 3) {
    return response.status(400).json({ error: 'username must be at least 3 characters long' })
  }
  name = !name ? username : name

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const saved = await user.save()
  response.status(201).json(saved)
})

module.exports = userRouter