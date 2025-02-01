import { useDispatch } from 'react-redux'
import { createAnn } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Form = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.annecdote.value
    event.target.annecdote.value = ''
    dispatch(createAnn(content))
    dispatch(setNotification(`added ${content} successfully!`, 5))
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={addNote}>
      <input name="annecdote" />
      <button type="submit">add</button>
    </form>
    </>
  )
}

export default Form