import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		updateAnecdote(state, action) {
			return state.map(a => (a.id !== action.payload.id ? a : action.payload))
		},
		setAnecdotes(state, action) {
			return action.payload
		},
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
	},
})

export const { updateAnecdote, setAnecdotes, appendAnecdote } =
	anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const voteAnecdote = id => {
	return async dispatch => {
		const anecdoteToUpdate = await anecdoteService.getAnecdote(id)
		const modifiedAnecdote = {
			...anecdoteToUpdate,
			votes: anecdoteToUpdate.votes + 1,
		}
		const updatedAnecdote = await anecdoteService.update(modifiedAnecdote)
		dispatch(updateAnecdote(updatedAnecdote))
	}
}

export default anecdoteSlice.reducer
