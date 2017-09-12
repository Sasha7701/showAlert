const INITIAL_STATE = {
	show: {},
	orderSuccess: false,
	orderFailure: false,
	error: null,

};


function favReduced(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "SUBMIT_ORDER_SUCCESS":
		return {
			...state,
			show: action.show,
			orderSuccess: true,
			orderFailure: false,
		};



	// Error Cases

	case "SUBMIT_ORDER_FAILURE":
		return {
			...state,
			error: action.error,
			orderSuccess: false,
			orderFailure: true,
		};

	default:
		return state;
	}
}

export default favReduced;
