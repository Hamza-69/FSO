import { useDispatch, useSelector } from 'react-redux'
import { voteApp } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'
import {changeDisplay} from '../reducers/displayReducer'

const List = () => {
  const filter = useSelector(state => state.filter.toLowerCase())
  const anecdotes = useSelector(state => state.anecdote).filter(item => item.content.toLowerCase().includes(filter))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteApp(id))
    dispatch(changeDisplay(''))
    dispatch(changeNotification(`voted to ${anecdotes.find(n => n.id == id).content} successfully!`))
    setTimeout(() => dispatch(changeDisplay('none')), 5000)
  }

  return (
    <>
    {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default List