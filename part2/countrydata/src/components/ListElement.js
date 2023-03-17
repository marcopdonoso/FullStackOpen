import React from "react";

const ListElement = ({ countriesToShow, index, showButton }) => {
  return (
    <p>
      {countriesToShow[index].name.common}{" "}
      <button
        onClick={() => {
          showButton(countriesToShow[index]);
        }}
      >
        show
      </button>
    </p>
  );
};

export default ListElement;
