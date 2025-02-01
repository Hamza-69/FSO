import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'
import { getAnecdotes, vote } from './services/anecdotes'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  const voteAn = useMutation({mutationFn: vote,
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], anecdotes.map((a) => a.id == newAnecdote.id? newAnecdote: a))
        setNotification({type: 'ADD', payload:`voted to anecdote ${newAnecdote.content}`})
        setTimeout(() => {setNotification({type: 'ADD', payload:''})}, 5000)
      }})

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const handleVote = (anecdote) => {
    voteAn.mutate(anecdote)
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
