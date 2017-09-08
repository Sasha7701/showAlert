const INITIAL_STATE = {
	shows: [],
	activeShow: null,
	isLoading: false,
	error: null,
};

export default function(state = INITIAL_STATE, action) {
	console.log(action);

	switch (action.type) {
		// Search
	case "SHOWS_SEARCH_START":
		return {
			...state,
			isLoading: true,
			shows: [],
		};

	case "SHOWS_SEARCH_SUCCESS":
		return {
			...state,
			isLoading: false,
			shows: action.shows,
		};

		// Load
	case "SHOWS_LOAD_START":
		return {
			...state,
			isLoading: true,
			activeShow: null,
		};

	case "SHOWS_LOAD_SUCCESS":
		return {
			...state,
			isLoading: false,
			activeShow: action.shows,

		};
console.log(action.shows, "ffvfvsrfv");
		// Error cases
	case "SHOWS_SEARCH_FAILURE":
	case "SHOWS_LOAD_FAILURE":
		return {
			...state,
			isLoading: false,
			error: action.error,
		};

	default:
		return state;
	}
}
