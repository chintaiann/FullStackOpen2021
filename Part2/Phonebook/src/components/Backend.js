import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
} //fetch initial state of phonebook 

const addPerson = personObject => { 
    const request = axios.post(baseUrl, personObject)
    return request.then(response=>response.data)
} // add 1 person into phonebook 


const deleteName = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response=>response.data)
}

const update = (id,personObject) => {
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    return request.then(response=>response.data)
}
    

export default {
    getPersons, addPerson , deleteName ,update
}