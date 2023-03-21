import React, { useEffect, useState } from "react";
import Number from "./components/Number";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchEntry, setSearchEntry] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
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
    };

    persons.some((person) => person.name === newPerson.name)
      ? window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        ) &&
        personService
          .update(persons.find((p) => p.name === newPerson.name).id, newPerson)
          .then((personUpdated) => {
            setPersons(
              persons.map((p) =>
                p.id !== personUpdated.id ? p : personUpdated
              )
            );
            setNotificationMessage(["success", `Modified '${newPerson.name}'`]);
            setTimeout(() => setNotificationMessage(null), 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            setNotificationMessage([
              "error",
              `Information of '${newPerson.name}' has already removed from server`,
            ]);
            setTimeout(() => setNotificationMessage(null), 5000);
            setPersons(persons.filter((p) => p.name !== newPerson.name));
            setNewName("");
            setNewNumber("");
          })
      : personService.create(newPerson).then((createdPerson) => {
          setNotificationMessage(["success", `Added '${newPerson.name}'`]);
          setTimeout(() => setNotificationMessage(null), 5000);
          setPersons(persons.concat(createdPerson));
          setNewName("");
          setNewNumber("");
        });
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((p) => {
      return p.id === id;
    });
    window.confirm(`Delete ${personToDelete.name}?`) &&
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setNotificationMessage([
            "success",
            `Deleted '${personToDelete.name}'`,
          ]);
          setTimeout(() => setNotificationMessage(null), 5000);
        })
        .catch(() => {
          setPersons(persons.filter((p) => p.id !== id));
        });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
          id={personToShow.id}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
