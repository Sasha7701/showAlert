const INITIAL_STATE = {
	shows: [],
	activeGif: null,
	isLoading: false,
	error: null,
};

export default function(state = INITIAL_STATE, action) {
	console.log(action);

	switch (action.type) {
		// Search
		case "GIFS_SEARCH_START":
			return {
				...state,
				isLoading: true,
				shows: [],
			};

		case "GIFS_SEARCH_SUCCESS":
			return {
				...state,
				isLoading: false,
				shows: action.shows,
			};

		// Load
		case "GIFS_LOAD_START":
			return {
				...state,
				isLoading: true,
				activeGif: null,
			};

		case "GIFS_LOAD_SUCCESS":
			return {
				...state,
				isLoading: false,
				activeGif: action.gif,
			};

		// Error cases
		case "GIFS_SEARCH_FAILURE":
		case "GIFS_LOAD_FAILURE":
			return {
				...state,
				isLoading: false,
				error: action.error,
			};

		default:
			return state;
	}
}
