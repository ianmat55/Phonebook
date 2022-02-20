const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

let Persons = [
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
    },
	{
		"id": 5,
		"name": "Ian",
		"number": 808
	}
]

app.get('/api/persons', (req, res) => {
	res.json(Persons);
})

app.post('/api/persons', (req, res) => { // ADD
	const randomId = Math.floor(Math.random() * 1000)
	if (!req.body.name || !req.body.number){
		return res.status(400).json({
			error: 'Missing input'
		})
	} else {
		const newPerson = {
			id: randomId,
			name: req.body.name,
			number: req.body.number
		}
		Persons = Persons.concat(newPerson)
		res.json(newPerson)
	}
})

app.put('/api/persons/:id', (req, res) => { // UPDATE
	const id = Number(req.params.id)
	for (let person of Persons) {
		if (person['id']===id) {
			person['number'] === req.body.number
			res.json(person['name'])
		}
	}
})

app.get('/api/persons/:id', (req, res) => { // FIND
	const id = Number(req.params.id)
	const person = Persons.find(persons => persons.id === id)
	if (person) {
		res.json(person)
	} else {
		res.status(404).end()
	}
})

app.delete('/api/persons/:id', (req, res) => { // DELETE
	const id = Number(req.params.id)
	if (id === -1) {
		return res.status(404)
	}
	Persons = Persons.filter(persons => persons.id !== id)
	res.json(Persons)
})

app.get('/info', (req, res) => {
	const entries = Persons.length
	const date = new Date()
	res.send(`<h3> Phonebook has info for ${entries} people <h3>\n${date}`)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})