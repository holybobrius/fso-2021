import React, { useState, useEffect } from 'react'
import InputField from './components/InputField'
import Person from './components/Person'
import Notification from './components/Notification'
import noteService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterPersons, setFilterPersons ] = useState(false)
  const [ filteredPersons, setFilteredPersons ] = useState([])
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const successfulNotifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const errorNotifStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added, update phone number?`)) {
        handleUpdate(persons.find(el => el.name === newName), newNumber)
      }
    } else {
        if(persons.some(el => el.number === newNumber)) {
          alert(`${newNumber} is already added to phonebook`)
        } else {
          noteService.create({ name: newName, number: newNumber })
            .then(res => {
              setPersons(persons.concat(res))
              setNotificationMessage(`${newName} was added to the database`)
            })
            .catch(error => setErrorMessage(`${error.response.data.error}`))
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        }
      }
  }
  
  const handleUpdate = (oldPerson, number) => {
    const newPerson = {...oldPerson, number: number}
    noteService.update(oldPerson.id, newPerson).then(res => setPersons(persons.map(person => person.id === oldPerson.id ? res : person))).catch(error => setErrorMessage('This person information was already removed'))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = person => {
    noteService.deletePerson(person).then(res => {
      setPersons(persons.filter(el => el.id !== person.id))
    }).catch(error => setErrorMessage('This person information was already removed'))
  }

  const handleFilter = (event) => {
    if(event.target.value !== '') {
      setFilterPersons(true)
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    } else {
      setFilterPersons(false)
    }
  }

  return (
    <div>
      <Notification message={notificationMessage} styles={successfulNotifStyle}/>
      <Notification message={errorMessage} styles={errorNotifStyle} />
      <h2>Phonebook</h2>
      <div>
        filter shown with <InputField handleChange={handleFilter}/>
      </div>
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <InputField handleChange={handleNameChange}/>
        </div>
        <div>
          number: <InputField handleChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      { /*<div>debug: {newName}</div> */}
      <h2>Numbers</h2>
      {filterPersons === false
        ? persons.map(person => <Person key={person.name} person={person} handleClick={handleDelete}/>)
        : filteredPersons.map(person => <Person key={person.name} person={person} handleClick={handleDelete}/>)}
    </div>
  )
}

export default App