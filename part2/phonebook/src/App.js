import React, { useEffect, useState } from "react";
import Number from "./components/Number";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchEntry, setSearchEntry] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

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
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    persons.some((person) => person.name === newPerson.name)
      ? alert(`${newPerson.name} is already added to phonebook`)
      : axios
          .post("http://localhost:3001/persons", newPerson)
          .then((response) => {
            setPersons(persons.concat(response.data));
            setNewName("");
            setNewNumber("");
          });
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
          key={personToShow.id}
          name={personToShow.name}
          number={personToShow.number}
        />
      ))}
    </div>
  );
};

export default App;
