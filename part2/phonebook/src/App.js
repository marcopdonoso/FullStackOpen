import React, { useState } from "react";
import Number from "./components/Number";

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
      <div>
        filter shown with{" "}
        <input onChange={handleSearchChange} value={searchEntry} type="text" />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
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
