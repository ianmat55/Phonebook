import React from 'react'
import personServices from '../services/persons'

export default function Phonebook({phonebook, setPersons, setMessage}) {
	const deleteEntry = (name, id) => {
	  const newPhonebook = phonebook.filter(person => person.name !== name)
	  const confirmation = window.confirm(`Delete ${name}?`)
	  console.log(confirmation)
	  if (confirmation) { // DELETE
		personServices 
		  .deleteContact(id)
		  .then((persons) => {
			console.log(persons.data)
			setPersons(newPhonebook)
			setMessage({style:'success', message: `You have successfuly deleed ${name} from the phonebook`})
			setTimeout(() => {
				setMessage(null)
			  }, 5000)
		  })
	  }
	};
  
	const renderPhoneBook = phonebook.map(entry => {
	  return (
		<div className='contact' key={entry.id}>
		  <p> {entry.name} {entry.number} </p>
		  <button onClick={() => deleteEntry(entry.name, entry.id)}> delete </button>
		</div>
	  )
	});
	return (
	  <div> 
		{renderPhoneBook}
	  </div>
	)
};