import React, { useState } from "react";
import Number from "./components/Number";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchEntry, setSearchEntry] = useState("");

  const personsToShow =
    searchEntry === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().startsWith(searchEntry.toLowerCase())
        );

  const handleSearchChange = (event) => {
    setSearchEntry(event.target.value);
    console.log(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    persons.some((person) => person.name === newPerson.name)
      ? alert(`${newPerson.name} is already added to phonebook`)
      : setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange} value={searchEntry} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      {personsToShow.map((personToShow) => (
        <Number
          key={personToShow.name}
          name={personToShow.name}
          number={personToShow.number}
        />
      ))}
    </div>
  );
};

export default App;
