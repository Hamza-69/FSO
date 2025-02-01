import Form from './components/Form'
import List from './components/List'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnn } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect( () => {
    dispatch(initializeAnn())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <List />
      <Form/>
    </div>
  )
}

export default App