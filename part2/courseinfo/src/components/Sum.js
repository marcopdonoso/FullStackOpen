import React from "react";

const Sum = ({ parts }) => {
  const sumCalc = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <strong>total of {sumCalc} exercises</strong>
    </p>
  );
};

export default Sum;
