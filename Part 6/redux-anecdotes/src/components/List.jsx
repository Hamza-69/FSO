import { useDispatch, useSelector } from 'react-redux'
import { voteAnn } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const List = () => {
  const filter = useSelector(state => state.filter.toLowerCase())
  const anecdotes = useSelector(state => state.anecdote).filter(item => item.content.toLowerCase().includes(filter))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnn(anecdote))
    dispatch(setNotification(`voted to ${anecdotes.find(n => n.id == anecdote.id).content} successfully!`, 5))
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
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default List