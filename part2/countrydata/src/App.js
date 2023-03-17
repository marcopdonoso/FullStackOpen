import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "./components/Input";
import Results from "./components/Results";

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [finder, setFinder] = useState("");
  //   const API_KEY = process.env.REACT_APP_CA_API_KEY;

  //   useEffect(() => {
  //     console.log("effect");
  //     axios
  //       .get("https://countryapi.io/api/all?apikey=" + API_KEY)
  //       .then((response) => {
  //         console.log("promise fulfilled");
  //         setCountriesData(response.data);
  //         console.log(response.data);
  //       });
  //   }, [API_KEY]);

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountriesData(response.data);
      console.log(response.data);
    });
  }, []);

  const countriesToShow =
    finder === ""
      ? []
      : countriesData.filter((country) => {
          return country.name.common
            .toLowerCase()
            .includes(finder.toLowerCase());
        });

  const handleChange = (event) => {
    setFinder(event.target.value);
  };

  return (
    <>
      <Input onChange={handleChange} value={finder} />
      <Results countriesToShow={countriesToShow} />
    </>
  );
};

export default App;
