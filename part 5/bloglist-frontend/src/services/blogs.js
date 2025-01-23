import axios from 'axios'
const baseUrl = '/api/blogs/'


const getAll = (token) => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const sendBlog = (info, token) => {
  const request = axios.post(baseUrl, info, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const like = (info, token) => {
  return axios.put(baseUrl+info.id, { ...info, likes: info.likes+1, user: info.user && info.user.id }, { headers: { Authorization: token } })
}

const deletePost = (info, token) => {
  return axios.delete(baseUrl+info.id, { headers: { Authorization: token } })
}

export default { getAll, sendBlog, like, deletePost }