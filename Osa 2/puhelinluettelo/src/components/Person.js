import React from 'react'
import contactService from '../services/contacts'

const Person = (props) => {

  const deleteContact = id => {
  if(window.confirm(`Delete contact ${props.name}?`)) {
    contactService
      .deleteContact(props.id)
        .then(props.setPersons(props.persons.filter(person => person.id !== id)))
        props.setErrorStyle({color: 'green'})  
            props.setErrorMessage(
              `Deleted ${props.name}`
            )
            
        setTimeout(() => {
          props.setErrorMessage(null)
        }, 3000) 
  }
  }
    return (
      <li>
      {props.name} {props.number}
      <button type="button" onClick={() => deleteContact(props.id)}>delete</button>
      </li>
    )
  }
export default Person