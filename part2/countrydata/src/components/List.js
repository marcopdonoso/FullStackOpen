import React from "react";
import ListElement from "./ListElement";

const List = ({ countriesToShow, showButton }) => {
  return countriesToShow.map((country, i) => {
    return (
      <ListElement
        key={i}
        index={i}
        countriesToShow={countriesToShow}
        showButton={showButton}
      />
    );
  });
};

export default List;
