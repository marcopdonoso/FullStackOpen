export const actionFilter = filter => {
	return {
		type: '@FILTER/SET',
		filter,
	}
}

const filterReducer = (state = '', action) => {
	switch (action.type) {
		case '@FILTER/SET':
			return action.filter
		default:
			return state
	}
}

export default filterReducer
