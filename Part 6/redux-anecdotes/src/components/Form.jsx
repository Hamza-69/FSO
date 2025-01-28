import { useDispatch } from 'react-redux'
import { createAnn } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'
import { changeDisplay } from '../reducers/displayReducer'

const Form = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.annecdote.value
    event.target.annecdote.value = ''
    dispatch(createAnn(content))
    dispatch(changeDisplay(''))
    dispatch(changeNotification(`voted to ${content} successfully!`))
    setTimeout(() => dispatch(changeDisplay('none')), 5000)
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