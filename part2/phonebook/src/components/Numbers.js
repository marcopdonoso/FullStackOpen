import React from "react";

const Numbers = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p>{person.name}</p>
      ))}
    </div>
  );
};

export default Numbers;
