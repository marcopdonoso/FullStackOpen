import { useMutation, useQueryClient } from 'react-query'
import { createNew } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
	const queryClient = useQueryClient()

	const notificationDispatch = useNotificationDispatch()

	const newAnecdoteMutation = useMutation(createNew, {
		onSuccess: newAnecdote => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
			notificationDispatch({
				type: 'SET',
				payload: `you added '${newAnecdote.content}'`,
			})
			setTimeout(() => {
				notificationDispatch({ type: 'RESET' })
			}, 5000)
		},
		onError: error => {
			notificationDispatch({
				type: 'SET',
				payload: error.response.data.error,
			})
			setTimeout(() => {
				notificationDispatch({ type: 'RESET' })
			}, 5000)
		},
	})

	const onCreate = event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		newAnecdoteMutation.mutate({ content, votes: 0 })
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
