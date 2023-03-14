import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Anecdote = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(6));

  const handleAnecdoteClick = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    setSelected(randomNumber);
  };

  const handleVoteClick = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const mostVotedAnecdoteIndex = () => points.indexOf(Math.max(...points));

  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        anecdote={props.anecdotes[selected]}
        votes={points[selected]}
      />
      <Button text="vote" onClick={handleVoteClick} />
      <Button text="next anecdote" onClick={handleAnecdoteClick} />
      <Anecdote
        title="Anecdote with most votes"
        anecdote={anecdotes[mostVotedAnecdoteIndex()]}
        votes={points[mostVotedAnecdoteIndex()]}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <App anecdotes={anecdotes} />
);
