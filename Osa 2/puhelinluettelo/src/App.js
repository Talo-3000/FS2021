import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import contactService from './services/contacts'
import './index.css'

const Notification = ({ message, errorStyle }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error" style={errorStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ errorStyle, setErrorStyle ] = useState()

  useEffect(() => {
    contactService.getAll()
      .then(contacts => setPersons(contacts))
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (alertName(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        const changedPerson = {...person, number: newNumber}
        const id = person.id
        contactService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
            setErrorStyle({color: 'green'})  
            setErrorMessage(
              `Updated ${personObject.name}`
            ) 
          })
          .catch(error => {
            setErrorStyle({color: 'red'})
            setErrorMessage(`${personObject.name} has already been removed`)
            setPersons(persons.filter(person => person.id !== id))
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)      
      }
      setNewName('')
      setNewNumber('')
      return
    }
    contactService
      .create(personObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setErrorStyle({color: 'green'})  
            setErrorMessage(
              `Added ${personObject.name}`
            )       
        })

    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const toShow = !filter ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  const alertName = (props) => {
    const names = persons.map(person => person.name.toLowerCase())
    if (names.includes(props)) {
      return true
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} errorStyle={errorStyle} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new contact</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {toShow.map(person =>
          <Person name={person.name} number={person.number} key={person.name} id={person.id} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} setErrorStyle={setErrorStyle}/>
        )}
      </ul>
     
    </div>
  )
}

export default App