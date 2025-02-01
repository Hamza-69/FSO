import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote, vote } from "../services/anecdotes"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification({type: 'ADD', payload:`added new anecdote ${newAnecdote.content}`})
      setTimeout(() => {setNotification({type: 'ADD', payload:''})}, 5000)
    },
    onError: () => {
      setNotification({type: 'ADD', payload:`too short anecdote, must have length 5 or more`})
      setTimeout(() => {setNotification({type: 'ADD', payload:''})}, 5000)
    }})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes:0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
