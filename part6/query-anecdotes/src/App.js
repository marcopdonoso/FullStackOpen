import { useQuery, useQueryClient, useMutation } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, updateAnecdote } from './requests'

const App = () => {
	const queryClient = useQueryClient()

	const updateAnecdoteMutation = useMutation(updateAnecdote, {
		onSuccess: updatedAnecdote => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData(
				'anecdotes',
				anecdotes.map(a => (a.id !== updatedAnecdote.id ? a : updatedAnecdote))
			)
		},
	})

	const handleVote = anecdote => {
		updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
	}

	const result = useQuery('anecdotes', getAll, {
		retry: 1,
	})

	if (result.isLoading) {
		return <div>loading data...</div>
	}

	if (result.isError) {
		return <div>anecdote service not available due to problems in server</div>
	}

	const anecdotes = result.data

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default App
