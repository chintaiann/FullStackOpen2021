require('dotenv').config()
var mongoose = require('mongoose');
const { json } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
var morgan = require('morgan')
app.use(morgan(':method :url :status :code'))
morgan.token("code",function getCode(req,res) {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    }
})




const Person = require('./models/person')



app.get('/api/persons',(request,response,next) => {
    Person.find({}).then(persons=>{
      response.json(persons)
    })
    .catch(error => { next(error)})
})

app.get('/info',(request,response,next)=> {
    const date = new Date()
    Person.countDocuments({}).then(returned => {
      response.json(`Phonebook has information for ${returned} people. Current Time : ${date}`)
    })
})


app.get('/api/persons/:id',(request,response,next)=>{
    
    Person.findById(request.params.id).then(found => {
      if(found){response.json(found)}
      else {
        response.status(404).end()
      }
    })
    .catch(error => { next(error)})
})

app.delete('/api/persons/:id',(request,response,next)=>{
    const query = { _id : mongoose.Types.ObjectId(request.params.id)}
    console.log({query})
    Person.deleteOne(query)
    .then(result => console.log(`Deleted ${result.deletedCount} item.`))
    .catch(error => { next(error)})
})

app.post('/api/persons',(request,response,next)=>{
    const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(saved => {
    response.json(saved)
  })
  .catch(error => { next(error)})
})

app.put('/api/persons/:id',(request,response,next)=> {
  const body = request.body 
  const person = {
    name:  body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person,
  { new:true, runValidators: true, context: 'query' })
  .then(updated => {
    response.json(updated)
  })
  .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})