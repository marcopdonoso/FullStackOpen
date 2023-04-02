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
	const [notificationMessage, setNotificationMessage] = useState({
		type: "",
		message: null,
	});

	useEffect(() => {
		personService.getAll().then((initialPersons) => setPersons(initialPersons));
	}, []);

	const handleSearchChange = (event) => {
		setSearchEntry(event.target.value);
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const wipePersonForm = () => {
		setNewName("");
		setNewNumber("");
	};

	const fillNotificationMessage = (type, message) => {
		setNotificationMessage({ type: type, message: message });
		setTimeout(() => setNotificationMessage({ message: null }), 5000);
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
						fillNotificationMessage("success", `Modified '${newPerson.name}'`);
						wipePersonForm();
					})
					.catch((error) => {
						if (error.response.status === 400) {
							fillNotificationMessage("error", error.response.data.error);
						} else {
							fillNotificationMessage(
								"error",
								`Information of '${newPerson.name}' has already removed from server`
							);
							setPersons(persons.filter((p) => p.name !== newPerson.name));
						}
						wipePersonForm();
					})
			: personService
					.create(newPerson)
					.then((createdPerson) => {
						fillNotificationMessage("success", `Added '${newPerson.name}'`);
						setPersons(persons.concat(createdPerson));
						wipePersonForm();
					})
					.catch((error) => {
						fillNotificationMessage("error", error.response.data.error);
						wipePersonForm();
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
					fillNotificationMessage(
						"success",
						`Deleted '${personToDelete.name}'`
					);
				})
				.catch(() => {
					setPersons(persons.filter((p) => p.id !== id));
				});
	};

	const personsToShow =
		searchEntry === ""
			? persons
			: persons.filter((person) =>
					person.name.toLowerCase().startsWith(searchEntry.toLowerCase())
			  );

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification notificationMessage={notificationMessage} />
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
