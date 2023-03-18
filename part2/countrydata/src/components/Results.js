import React from "react";
import Country from "./Country";
import List from "./List";

const Results = ({ countriesToShow, showButton, API_KEY }) => {
  switch (true) {
    case countriesToShow.length === 0:
      return <p>No matches, specify another filter</p>;
    case countriesToShow.length === 1:
      return <Country countryData={countriesToShow[0]} API_KEY={API_KEY} />;
    case countriesToShow.length > 1 && countriesToShow.length <= 10:
      return <List countriesToShow={countriesToShow} showButton={showButton} />;
    case countriesToShow.length > 10:
      return <p>Too many matches, specify another filter</p>;
    default:
      break;
  }
};

export default Results;
