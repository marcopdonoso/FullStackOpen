import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET':
			return action.payload
		case 'RESET':
			return ''
		default:
			return state
	}
}

export const NotificationContextProvider = props => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		''
	)

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export const useNotificationValue = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[1]
}

export default NotificationContext