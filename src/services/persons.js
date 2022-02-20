import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
	console.log('getAll')
	return axios.get(baseUrl)
}

const addContact = newPerson => {
	console.log('addContact')
	return axios.post(baseUrl, newPerson)
}

const deleteContact = person => {
	console.log('DELETE')
	return axios.delete(baseUrl + '/' + person)
}

const updateContact = (id, person) => {
	console.log('Update')
	return axios.put(`${baseUrl}/${id}`, person)
}

export default { getAll, addContact, deleteContact, updateContact }