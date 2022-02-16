import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	return axios.get(baseUrl)
}

const addContact = newPerson => {
	return axios.post(baseUrl, newPerson)
}

const deleteContact = person => {
	return axios.delete(baseUrl + '/' + person)
}

const updateContact = (id, person) => {
	return axios.put(`${baseUrl}/${id}`, person)
}

export default { getAll, addContact, deleteContact, updateContact }