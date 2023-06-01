import { useDispatch } from 'react-redux'
import { actionCreate } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const create = event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(actionCreate(content))
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={create}>
				<div>
					<input name="anecdote" />
				</div>
				<button>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm
