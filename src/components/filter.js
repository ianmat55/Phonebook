import React from 'react' 

export default function Filter({name, persons, setPersons, newFilter, setNewFilter})  {
	const temp = persons;

	const handleFilterInput = (e) => {
		if (persons.length === 0) {
			setPersons(temp)
		} else {
			setNewFilter(e.target.value);
			const regex = new RegExp( newFilter, 'i' );
			const filteredPerson = persons.filter(person => person.name.match(regex));
			setPersons(filteredPerson)
		}
	}

	return(
	  <div>
		Filter by name: <input name={name} onChange={handleFilterInput} />
	  </div>
	);
  };

