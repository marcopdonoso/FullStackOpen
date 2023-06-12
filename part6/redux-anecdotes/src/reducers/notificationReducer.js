import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		fillNotification(state, action) {
			return action.payload
		},
		clearNotification(state, action) {
			return ''
		},
	},
})

export const { fillNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
	return dispatch => {
		dispatch(fillNotification(message))
		setTimeout(() => {
			dispatch(clearNotification())
		}, time * 1000)
	}
}

export default notificationSlice.reducer
