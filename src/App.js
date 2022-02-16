import './App.css';
import React, { useState, useEffect } from 'react';
import personServices from './services/persons';

const Filter = ({name, onChange}) => {
  return(
    <div>
      Filter by name: <input name={name} onChange={onChange} />
    </div>
  );
};

const Phonebook = ({phonebook, setPersons}) => {
  const deleteEntry = (name, id) => {
    const confirmation = window.confirm(`Delete ${name}?`)
    
    if (confirmation) {
      personServices
        .deleteContact(id)
        .then(() => {
          delete phonebook.id
          setPersons(phonebook)
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

const PersonForm = ({newName, newNumber, handleNameInput, handleNumberInput, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
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

const Notification = ({ log }) => {
  let classType 
  if (log === null || log === undefined) {
    return null
  } else if (log.style === 'error') {
    classType = 'error'
  } else {
    classType = 'success'
  }
  return (
    <div className={classType}>
      {log.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    personServices
    .getAll()
    .then(res => {
      setPersons(res.data)
    })
  }, []);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState()

  const addPerson = (e) => {
    e.preventDefault();
    const newId = persons.length+1;
    
    const newPerson = {
      name: newName,
      number: newNumber,
      id: newId
    };

    for (let person of persons) {
      if (person.name === newPerson.name) {
        const message = window.confirm(`${newPerson.name} is already in the phonebook. Update contact?`);
        if (message) {
          person.number = newNumber;
          personServices
            .updateContact(person.id, person)
            .then(id => {
              console.log(id);
              setMessage({style:'success', message: `You have sucessfully updated ${id.data.name}'s contact info`})
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

    personServices
    .addContact(newPerson)
    .then(id => {
      console.log(id);
      setMessage({style:'success', message: `You have sucessfully added ${id.data.name} as a contact`})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.concat(newPerson))
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

  const handleFilterInput = (e) => {
    setNewFilter(e.target.value);
    const regex = new RegExp( newFilter, 'i' );
    const filteredPerson = persons.filter(person => person.name.match(regex));
    setPersons(filteredPerson)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={newFilter} onChange={handleFilterInput} />
      <h2> Add new </h2>
      <Notification log={message} />
      <PersonForm newName={newName} newNumber={newNumber} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} onSubmit={addPerson} />
      <h2>Numbers</h2>
      <Phonebook phonebook={persons} setPersons={setPersons} />
    </div>
  )
}

export default App
