import React, { useState, useEffect } from 'react'
import Content from './components/Content'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Backend from './components/Backend'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter,setNewFilter] = useState('')
  const [errorMessage,setErrorMessage] = useState(null)
 


  const firstperson = () => {
    Backend.getPersons()
    .then(returned=>{
      setPersons(returned)
    })
  }
  useEffect(firstperson,[])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => { 
    setNewNumber(event.target.value)
  }
  
  const Notification = ({message}) => {
    const notiStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
    if (message===null) {
      return null
    }

    else {
      return (
        <div style={notiStyle}>
          {message}
        </div>
      )
    }
  }

const addPerson = (event) => {
    event.preventDefault()
    let x = 1
    persons.forEach(value => {
      if (value.name === newName) {
        if (window.confirm(`${newName} is already in phonebook, replace old number with new one?`)){
          x = 2
        }
        else {
          x = 0 
        }
      }
    })

    if (x===1) { 
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      //setPersons(persons.concat(personObject))
      Backend.addPerson(personObject)
      .then(returned => {
        setPersons(persons.concat(returned))
        setErrorMessage(`${newName} has been added to phonebook!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('') 
      })
      
    }
    if (x===2) { 
      const personObject = {
        name: newName,
        number: newNumber
      }
      const replace = persons.filter(person => person.name===newName)
      const replaceId = replace[0].id
      Backend.update(replaceId,personObject).then(
        returned=> {
          setPersons(persons.map(item => item.id !== replaceId ? item : returned))
        }
      ).catch(error => {
        setErrorMessage(`Information of ${newName} has already been removed from server.`)
      })
      setErrorMessage(`${newName} has been updated in the phonebook!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('') 
    }
  }


  const deleteName = (id) => {
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)) {
      Backend
        .deleteName(personId)
        .catch(error => {
          setErrorMessage(`Information of ${personName} has already been removed from server.`)
        })
      console.log(`${personName} successfully deleted`)
      setPersons(persons.filter(person => person.id !== personId)) //return values that id is not personId 
      
    
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage}/>
      <Filter newFilter = {newFilter} setNewFilter = {setNewFilter} />
      
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber = {newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        <ul>
          <Content persons = {persons} searchName={newFilter} deleteName={deleteName} />
        </ul>
      </div>
    </div>
  )
}

export default App