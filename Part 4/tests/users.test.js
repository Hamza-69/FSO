const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./userTestHelper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  for (const user of helper.initialUsers) {
    let { username, name, password } = user
    const passwordHash = await bcrypt.hash(password, 10)
    let userObject = new User({
      username,
      name,
      passwordHash
    })
    await userObject.save()
  }
})

describe('GET Users', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('there are 3 users', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, 3)
  })
  test('ID is represented by id and not _id', async () => {
    const response = await api.get('/api/users')
    const condition = response.body.reduce((acc, user) => acc && user.id && !user._id, true)
    assert(condition)
  })
  test('password is hidden', async () => {
    const response = await api.get('/api/users')
    const condition = response.body.reduce((acc, user) => acc && !user.password, true)
    assert(condition)
  })
}
)

describe('POST User', () => {
  test('Adding a user works', async () => {
    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let responseUsers = await api.get('/api/users')
    responseUsers = responseUsers.body
    assert(responseUsers.length === 4)

    assert(responseUsers.map(n => n.username).includes('ahmad'))
    assert(responseUsers.map(n => n.name).includes('Ahmad El Shafii'))
  })
  test('Adding a user without name works', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserNoName)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let responseUsers = await api.get('/api/users')
    responseUsers = responseUsers.body
    assert(responseUsers.length === 4)

    assert(responseUsers.map(n => n.username).includes('ahmad'))
    assert(responseUsers.map(n => n.name).includes('ahmad'))
  })
  test('Adding a user without password fails', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserNoPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('Adding a user without username fails', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserNoUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('Adding a duplicate user fails', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserPresent)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('Adding a user with short password fails', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('Adding a user with short name fails', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserShortName)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
}
)
after(async () => {
  await mongoose.connection.close()
})