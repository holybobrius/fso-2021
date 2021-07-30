const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()



app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

const generateId = () => {
    return Math.floor(Math.random() * 100000)
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    date = new Date()
    const info = 
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
    </div>`
    response.send(info)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if(person) response.json(person)
     else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    if(!body.name || !body.number || persons.map(p => p.name).includes(body.name)) return response.status(400).json({ error: 'content error' })
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(persons)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})