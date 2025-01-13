import {useEffect, useState} from 'react'
import people from './services/people.js'
import "./index.css"
const Button = ({text, onClick}) => {
    return <button onClick={onClick}>{text}</button>
}
const Input = ({value, onChange, text}) => {
    return (
        <div>
        {text} <input value={value} onChange={onChange}/>
        </div>
    )
}
const Filter = ({onChange, value, text}) => {
    return (<Input text ={text} value = {value} onChange={onChange} />)
}

const Persons = ({persons, items, filter,deletePerson}) => {
    return (
        <>
        {(!filter? persons: items).map((person) => (<li key={person.id}>{person.name} {person.number}<Button onClick={() => deletePerson(person.id, person.name)} text="delete"/></li>))}
</>
)
}
const Notification = ({className,text}) => {
    return (
        <div className={className}>
            {text}
        </div>
    )
}
const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [items, setItems] = useState(persons)
    const [type, setType] = useState("")
    const [text, setText] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        let toUpdate;
        let text, className;
        if (persons.find((item) => item.name.toLowerCase() === newName.toLowerCase() && (toUpdate = item)) && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
            people.updateNumber(toUpdate, newNumber).then((response) => {
                setPersons(persons.map(item => {
                    if (item.id === response.id) {
                        return {...item, number: newNumber}
                    }
                    return item
                }))
                setText(`Changed ${newName} Phone Number`)
                setType("good")
            }).catch((response) => {
                setText(`Information of ${newName} has already been removed from server`)
                setType("error")
            })
        else {
            let person = {name: newName, number: newNumber}
            people.add(person).then(response => {
                setPersons(persons.concat(response))
            })
            setText(`Added ${newName}`)
            setType("good")
        }
            setNewName("")
            setNewNumber("")
    }
    useEffect(() => {
        people.getAll().then((db) => {
            setPersons(db)
        })
    },[])
    const handleChange = (e) => {
        setFilter(e.target.value)
        setItems(persons.filter((item) => item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1))
    }
    const deletePerson = (id, person) => {
        if (window.confirm(`Delete ${person} ?`)) {
            people.deleteItem(id).then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification className={type} text={text} />
            <Filter text ="filter above with:" value = {filter} onChange={handleChange} />
            <h2>add a new</h2>
            <form onSubmit={handleSubmit}>
                <Input text = "name:" value={newName} onChange={e => setNewName(e.target.value)} />
                <Input text = "number:" value={newNumber} onChange={e => setNewNumber(e.target.value)} />
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <Persons persons={persons} items={items} filter={filter} deletePerson={deletePerson} />
        </div>
    )
}

export default App