import axios from 'axios'
const baseUrl = '/api/blogs'


const getAll = (token) => {
  const request = axios.get(baseUrl, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const sendBlog = (info, token) => {
  const request = axios.post(baseUrl, info, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

export default { getAll, sendBlog}