import { useDispatch } from 'react-redux'
import { actionFilter } from '../reducers/filterReducer'

const Filter = () => {
	const dispatch = useDispatch()

	const style = {
		marginBottom: 10,
		marginTop: 10,
	}

	const handleChange = event => {
		dispatch(actionFilter(event.target.value.toUpperCase()))
	}

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	)
}

export default Filter
