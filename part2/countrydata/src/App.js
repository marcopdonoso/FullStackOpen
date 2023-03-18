import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "./components/Input";
import Results from "./components/Results";

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [finder, setFinder] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);
  const API_KEY = process.env.REACT_APP_WA_API_KEY;

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountriesData(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    setCountriesToShow(() => {
      return finder === ""
        ? []
        : countriesData.filter((country) => {
            return country.name.common
              .toLowerCase()
              .includes(finder.toLowerCase());
          });
    });
  }, [finder, countriesData]);

  const handleChange = (event) => {
    setFinder(event.target.value);
  };

  const showButton = (props) => {
    setCountriesToShow([props]);
  };

  return (
    <>
      <Input onChange={handleChange} value={finder} />
      <Results
        countriesToShow={countriesToShow}
        showButton={showButton}
        API_KEY={API_KEY}
      />
    </>
  );
};

export default App;
