import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll =  async () => {
  const x = await axios.get(baseUrl)
  return x.data
}

const saveAnn = async (content) => {
  const response = await axios.post(baseUrl, asObject(content))
  return response.data
}
const voteAnn = async (content) => {
  const response = await axios.put(baseUrl+"/"+content.id, {...content, votes: content.votes+1})
  return response.data
}

export default { getAll, saveAnn, voteAnn }