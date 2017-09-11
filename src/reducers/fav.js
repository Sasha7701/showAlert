const INITIAL_STATE = {
	// cartCount: 0,
	fav: [],
};

function favReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case "ADD_TO_FAV":
		return {
			fav: [...state.fav,
				action.show,
			],
			// cartCount: state.cartCount + 1,
		};
	case "CANT_ADD_TO_FAV":
		return {
			...state,
			error: action.error,
		};
	default:
		return state;
	}
}


export default favReducer;
