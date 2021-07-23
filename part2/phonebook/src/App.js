import React, { useState, useEffect } from 'react'
import InputField from './components/InputField'
import Person from './components/Person'
import noteService from './services/persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterPersons, setFilterPersons ] = useState(false)
  const [ filteredPersons, setFilteredPersons ] = useState([])

  useEffect(() => {
    noteService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    persons.some(person => person.name === newName)
     ? alert(`${newName} is already added to phonebook`)
     : persons.some(el => el.number === newNumber)
        ? alert(`${newNumber} is already added to phonebook`)
        : noteService.create({ name: newName, number: newNumber }).then(res => setPersons(persons.concat(res)))
        console.log(persons)
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
    })
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