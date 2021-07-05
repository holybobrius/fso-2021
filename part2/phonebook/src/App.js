import React, { useState, useEffect } from 'react'
import InputField from './components/InputField'
import Person from './components/Person'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterPersons, setFilterPersons ] = useState(false)
  const [ filteredPersons, setFilteredPersons ] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => setPersons(res.data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    persons.some(person => person.name === newName)
     ? alert(`${newName} is already added to phonebook`)
     : persons.some(el => el.number === newNumber)
        ? alert(`${newNumber} is already added to phonebook`)
        : setPersons(persons.concat({ name: newName, number: newNumber }))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    if(event.target.value !== '') {
      setFilterPersons(true)
      setFilteredPersons(persons.filter(person => person.name.toLowerCase() === event.target.value.toLowerCase()))
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
        ? persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)
        : filteredPersons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App