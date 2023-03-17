import React from "react";

const List = ({ countriesToShow }) => {
  return countriesToShow.map((country, i) => {
    return <p key={i}>{country.name.common}</p>;
  });
};

export default List;
