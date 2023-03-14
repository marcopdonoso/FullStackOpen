import React, { useState } from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>
        {value} {text === "positive" && "%"}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  const all = () => total;

  const average = () => {
    return (good - bad) / total;
  };

  const positive = () => (good * 100) / total;

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all()} />
        <Statistic text="average" value={average()} />
        <Statistic text="positive" value={positive()} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);
//ReactDOM.render(<App />, document.getElementById("root"));
