import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div key={anecdote.id}>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</div>
	)
}

const AnecdoteList = () => {
	const dispatch = useDispatch()

	const anecdotes = useSelector(({ anecdotes, filter }) =>
		[...anecdotes]
			.sort((a, b) => b.votes - a.votes)
			.filter(a => a.content.toUpperCase().startsWith(filter))
	)

	return (
		<>
			{anecdotes.map(anecdote => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => {
						dispatch(voteAnecdote(anecdote.id))
						dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
					}}
				/>
			))}
		</>
	)
}

export default AnecdoteList
