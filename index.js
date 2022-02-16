const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
	res.send("<h1> This is my first express app! </h1>")
})

app.get('/api/persons', (req, res) => {
	res.json(notes);
})

app.post('/api/persons', (req, res) => {
	const randomId = Math.floor(Math.random() * 1000)
	if (!req.body.name || !req.body.number){
		return res.status(400).json({
			error: 'Missing input'
		})
	} else if (notes.find(person => person.name === req.body.name)) {
		return res.status(400).json({
			error: 'Name already in phonebook'
		})
	} else {
		const newPerson = {
			id: randomId,
			name: req.body.name,
			number: req.body.number
		}
		notes = notes.concat(newPerson)
		res.json(newPerson)
	}
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	console.log(id)
	const person = notes.find(note => note.id === id)
	if (person) {
		res.json(person)
	} else {
		res.status(404).end()
	}
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	notes = notes.filter(note => note.id !== id)
	console.log(notes)
	res.status(204).end()
})

app.get('/info', (req, res) => {
	const entries = notes.length
	const date = new Date()
	res.send(`<h3> Phonebook has info for ${entries} people <h3>\n${date}`)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})