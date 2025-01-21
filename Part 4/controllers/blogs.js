const blogRouter = require('express').Router()
const Blog = require('./../models/blog')
const User = require('./../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username : 1, name : 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const likes = request.body.likes || 0

  const user = await User.findById(request.user.id)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: likes,
    user: user._id.toString()
  })

  const saved = await blog.save()

  user.blogs = user.blogs.concat(saved._id)

  await user.save()

  response.status(201).json(saved)
})

blogRouter.delete('/:id', async (request, response) => {
  if (!request.params.id) {
    return response.status(401).json({ error: 'id must be specified' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!request.user.id || request.user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true , runValidators: true })
  response.status(204).end()
})
module.exports = blogRouter