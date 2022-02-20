import './App.css';
import React, { useState, useEffect } from 'react';
import personServices from './services/persons';
import Filter from './components/filter';
import PersonForm from './components/personForm';
import Phonebook from './components/phonebook';
import Notification from './components/notification';

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
  const [message, setMessage] = useState();

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={newFilter} persons={persons} setPersons={setPersons} newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2> Add new </h2>
      <Notification log={message} />
      <PersonForm people={persons} newName={newName} newNumber={newNumber} setMessage={setMessage} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Phonebook phonebook={persons} setPersons={setPersons} setMessage={setMessage} />
    </div>
  )
}

export default App
