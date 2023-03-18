import axios from "axios";
import React, { useEffect, useState } from "react";

const Country = ({ countryData, API_KEY }) => {
  const [weatherData, setWeatherData] = useState([]);
  const { name, capital, population, languages, flags } = countryData;

  useEffect(() => {
    console.log("effect weather data");
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${capital[0]}&aqi=no
        `
      )
      .then((response) => {
        console.log("promise fulfilled on weather");
        const {
          temp_c,
          condition: { icon, text },
          wind_kph,
          wind_dir,
        } = response.data.current;
        setWeatherData({ temp_c, icon, text, wind_kph, wind_dir });
      });
  }, [API_KEY, capital]);

  console.log(weatherData);

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
      <p>Temperature: {weatherData.temp_c} Celcius</p>
      <img src={weatherData.icon} alt={weatherData.text} width="150px" />
      <p>
        wind: {weatherData.wind_kph} kph direction {weatherData.wind_dir}
      </p>
    </div>
  );
};

export default Country;
