import API from "util/api";

export function submitOrder(order, cartItemIds) {
	return (dispatch, getStore) => {
		//Get current state from the store (at the time of function being executed)
		const { fav } = getStore().fav;
		const showIds  =	fav.map(function(show) {
			return show.show.id;
		});
		dispatch({
			type: "SUBMIT_ORDER_START",
		});
		console.log("submitOrder(order, fav)", showIds);
		API.post('/list', {
			args: {

				shows: showIds,
			},
		})
			.then((res) => {
				if (res.data) {
					console.log("submitOrder(success)",res, res.data);
					dispatch({
						type: "SUBMIT_ORDER_SUCCESS",
						data: res.data,
						fav,
					});
				}
				else {
					console.log("submitOrder(error)",res);

					dispatch({
						type: "SUBMIT_ORDER_FAILURE",
						error: res.error.message,
					});
				}
			})
			.catch((error) => {
				dispatch({
					type: "SUBMIT_ORDER_FAILURE",
					error: "Something went wrong, please refresh",
				});
			});
	};
}
