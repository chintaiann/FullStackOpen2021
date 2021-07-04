import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Content from './components/Content'

const App = () => {
  //state to store all countries
  const [allCountries,setallCountries] = useState([])
  const [countries,setCountries] = useState([])
  const [newFilter,setNewFilter] = useState('')
  

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setallCountries(response.data)
    })
  }
  useEffect(hook,[])

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    if (newFilter) {
      const filteredcountries = allCountries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
      setCountries(filteredcountries)
    }
  }




  return (
    <div>
      <Filter newFilter = {newFilter} onChange= {handleFilter} />
      <Content countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App