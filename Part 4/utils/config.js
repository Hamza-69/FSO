require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI_TEST = process.env.MONGODB_URI_TEST
const ENV = process.env.NODE_ENV

module.exports = {
  MONGODB_URI,
  MONGODB_URI_TEST,
  ENV
}