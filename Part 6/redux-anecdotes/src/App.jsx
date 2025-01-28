import Form from './components/Form'
import List from './components/List'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
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