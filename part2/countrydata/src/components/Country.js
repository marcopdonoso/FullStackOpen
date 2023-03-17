import React from "react";

const Country = ({ countryData }) => {
  const { name, capital, population, languages, flags } = countryData;
  return (
    <div>
      <h1>{name.common}</h1>
      <p>Capital: {capital[0]}</p>
      <p>Population: {population}</p>
      <h3>Lenguages</h3>
      <ul>
        {Object.values(languages).map((language, i) => {
          return <li key={i}>{language}</li>;
        })}
      </ul>
      <img src={flags.svg} alt={flags.alt} width="150px" />
    </div>
  );
};

export default Country;
