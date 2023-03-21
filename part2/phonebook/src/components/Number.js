import React from "react";

const Number = ({ name, number, id, handleDelete }) => {
  return (
    <div>
      <p>
        {name} {number} <button onClick={() => handleDelete(id)}>delete</button>
      </p>
    </div>
  );
};

export default Number;
