import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./data.json";
import VisibleRow from "./helpers/VisibleRow";
import EditableRow from "./helpers/EditableRow";


const App = () => {
  const [persons, setPersons] = useState(data);
  const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  const [editPersonId, setEditPersonId] = useState(null);

  //Storing the values that are typed in the input boxes
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  //Storing the values that are typed in the input boxes while editing
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };
  //handling necessary data and moving it to the right place after new person's information is added
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      id: nanoid(),
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      age: addFormData.age,
    };

    const newPersons = [...persons, newPerson];
    setPersons(newPersons);
  };

  //handling necessary data when editing person's information
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedPerson = {
      id: editPersonId,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      age: editFormData.age,
    };

    const newPersons = [...persons];

    const index = persons.findIndex((person) => person.id === editPersonId);

    newPersons[index] = editedPerson;

    setPersons(newPersons);
    setEditPersonId(null);
  };

  //What happens when delete is clicked
  const handleDeleteClick = (personId) => {
    const newPersons = [...persons];

    const index = persons.findIndex((person) => person.id === personId);

    newPersons.splice(index, 1);

    setPersons(newPersons);
  };

  //what happens when edit is clicked
  const handleEditClick = (event, person) => {
    event.preventDefault();
    setEditPersonId(person.id);

    const formValues = {
      firstName: person.firstName,
      lastName: person.lastName,
      age: person.age,
    };

    setEditFormData(formValues);
  };

  //handling a cancel click while editing person's info
  const handleCancelClick = () => {
    setEditPersonId(null);
  };


  //Structure for the app
  return (
    <div className="app-container">
      <h1>Person table</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table class="rounded">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <Fragment>
                {editPersonId === person.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <VisibleRow
                    person={person}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Person</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="firstName"
          required="required"
          placeholder="Enter your firstname..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="lastName"
          required="required"
          placeholder="Enter your lastname..."
          onChange={handleAddFormChange}
        />
        <input 
          type="text"
          name="age"
          required="required"
          placeholder="Enter your age..."
          onChange={handleAddFormChange}
        />
        <button id="submitButton" type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;