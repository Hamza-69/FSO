const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blogTestHelper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('GET Blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
  })
  test('ID is represented by id and not _id', async () => {
    const response = await api.get('/api/blogs')
    const condition = response.body.reduce((acc, blog) => acc && blog.id && !blog._id, true)
    assert(condition)
  })
}
)

describe('POST Blog', () => {
  test('Adding a blog works', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let responseBlogs = await api.get('/api/blogs')
    responseBlogs = responseBlogs.body
    assert(responseBlogs.length === 7)

    assert(responseBlogs.map(n => n.title).includes('What Coding is all About'))
    assert(responseBlogs.map(n => n.author).includes('Hamza El Rachdi'))
    assert(responseBlogs.map(n => n.url).includes('https://hrmedia.substack.com/p/what-coding-is-all-about'))
    assert(responseBlogs.map(n => n.likes).includes(1))
  })
  test('Adding a blog works with no likes works', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogNoLike)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let responseBlogs = await api.get('/api/blogs')
    responseBlogs = responseBlogs.body
    assert(responseBlogs.length === 7)

    assert(responseBlogs.reduce((acc, blog) => acc || ( blog.author === 'Hamza El Rachdi' && blog.likes === 0), false))
  })
  test('Adding a blog works with no title fails', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogNoTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('Adding a blog works with no url fails', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogNoUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
}
)
after(async () => {
  await mongoose.connection.close()
})