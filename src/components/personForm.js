import React from 'react' 
import personServices from '../services/persons';

export default function PersonForm({people, newName, newNumber, setMessage, setPersons, setNewName, setNewNumber}) {
	const addPerson = (e) => {
		e.preventDefault();
		const newId = people.length+1;
		
		const newPerson = {
		  name: newName,
		  number: newNumber,
		  id: newId
		};
	
		for (let person of people) { //UPDATE
		  if (person.name === newPerson.name) {
			const message = window.confirm(`${newPerson.name} is already in the phonebook. Update contact?`);
			if (message) {
			  person.number = newNumber;
			  personServices
				.updateContact(person.id, newPerson)
				.then((name) => {
				  console.log(name.data.name)
				  setMessage({style:'success', message: `Contact updated`})
				  setTimeout(() => {
					setMessage(null)
				  }, 5000)
				})
				.catch(error => {
				  setMessage({style:'error', message:error})
				  setTimeout(() => {
					setMessage(null)
				  }, 5000)
				})
			}
			return
		  }
		}
	
		personServices // ADD
		.addContact(newPerson)
		.then(id => {
		  console.log(id);
		  setMessage({style:'success', message: `You have sucessfully added ${id.data.name} as a contact`})
		  setTimeout(() => {
			setMessage(null)
		  }, 5000)
		  setPersons(people.concat(newPerson))
		  setNewName('');
		  setNewNumber('');
		})
		.catch(error => {
		  setMessage({style:'error', message:error})
		  setTimeout(() => {
			setMessage(null)
		  }, 5000)
		})
	};

	const handleNameInput = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberInput = (e) => {
		setNewNumber(e.target.value);
	};

	return (
	  <form onSubmit={addPerson}>
		<div>
		  name: <input name={newName} onChange={handleNameInput} />
		</div>
		<div>
		  number: <input number={newNumber} onChange={handleNumberInput} />
		</div>
		<div>
		  <button type="submit">add</button>
		</div>
	  </form>
	)
};