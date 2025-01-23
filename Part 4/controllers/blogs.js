const blogRouter = require('express').Router()
const Blog = require('./../models/blog')
const User = require('./../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username : 1, name : 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const likes = request.body.likes || 0
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
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

  if (!request.user || !request.user.id || request.user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.body.id)

  if (!blog.likedUsers) {
    blog.likedUsers = []
  }
  if (!(blog.likedUsers.find((x) => x.toString() === request.body.user))) {
    await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true , runValidators: true })
    blog.likedUsers = blog.likedUsers.concat(request.user.id)
    await blog.save()
  } else {
    return response.status(400).json({ error: 'user liked already' })
  }

  response.status(204).end()
})
module.exports = blogRouter