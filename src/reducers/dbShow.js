const INITIAL_STATE = {
	shows: [],
	isLoading: false,
	error: null,
};

export default function(state = INITIAL_STATE, action) {
	console.log(action);
console.log(action.shows);
	switch (action.type) {
		// Search
	case "SHOWS_DID_START":
		return {
			...state,
			isLoading: true,
			shows: [],
		};

	case "SHOWS_ALL_SUCCESS":
		return {
			...state,
			isLoading: false,
			shows: action.shows,
		};

		// Error cases
	case "SHOWS_ALL_FAILURE":
  return {
			...state,
error: action.error,
		};

	default:
		return state;
	}
}
