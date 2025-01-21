const User = require('../models/user')

const initialUsers = [
  {
    username: 'hamza',
    name: 'Hamza El Rachdi',
    password: '123hamza'
  },
  {
    username: 'ali',
    name: 'Ali Ismail',
    password: 'ali456ism'
  },
  {
    username: 'omar',
    name: 'Omar Rawwas',
    password: '123oR123'
  }
]

const newUser = {
  username: 'ahmad',
  name: 'Ahmad El Shafii',
  password: 'ahmadgames'
}
const newUserNoPassword = {
  username: 'ahmad',
  name: 'Ahmad El Shafii'
}
const newUserShortPassword = {
  username: 'ahmad',
  password: '12',
  name: 'Ahmad El Shafii'
}
const newUserShortName = {
  username: 'ah',
  password: 'ahmadgames',
  name: 'Ahmad El Shafii'
}
const newUserNoUsername = {
  name: 'Ahmad El Shafii',
  password: 'ahmadgames'
}
const newUserNoName = {
  username: 'ahmad',
  password: 'ahmadgames'
}
const newUserPresent = {
  username: 'hamza',
  name: 'Hmaza Rawwas',
  password: 'hamza1234'
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers,
  usersInDb,
  newUser,
  newUserNoPassword,
  newUserNoUsername,
  newUserShortPassword,
  newUserShortName,
  newUserNoName,
  newUserPresent
}