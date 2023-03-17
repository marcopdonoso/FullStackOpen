import React from "react";

const Input = ({ onChange, value }) => {
  return (
    <div>
      find countries <input onChange={onChange} value={value} />
    </div>
  );
};

export default Input;
