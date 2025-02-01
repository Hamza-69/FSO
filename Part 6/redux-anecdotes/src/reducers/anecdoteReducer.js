import { createSlice } from '@reduxjs/toolkit'
import ann from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState :[],
  reducers: {
    addAnn(state, action) {
      state.push(action.payload)
    },
    voteApp(state, action) {
      return state.map(n => n.id == action.payload.id ? action.payload: n)
      },
   setAnn(state, action) {
    return action.payload
   }
}}) 

export const { addAnn, voteApp, setAnn } = anecdoteSlice.actions

export const initializeAnn = () => {
  return async dispatch => {
    const notes = await ann.getAll()
    dispatch(setAnn(notes))
  }
}

export const voteAnn = x => {
  return async dispatch => {
    const newNote = await ann.voteAnn(x)
    dispatch(voteApp(newNote))
  }
}

export const createAnn = x => {
  return async dispatch => {
    const newNote = await ann.saveAnn(x)
    dispatch(addAnn(newNote))
  }
}

export default anecdoteSlice.reducer