import React from "react";

const VisibleRow = ({ person, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{person.firstName}</td>
      <td>{person.lastName}</td>
      <td>{person.age}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, person)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(person.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default VisibleRow;