import API from "util/api";

export function addToFav(show) {
console.log( show, "QQQQQQQQQQ");
  return (dispatch, getStore) => {
		//Get current state from the store (at the time of function being executed)
		const { fav } = getStore().fav;
    console.log(fav.id, "what's inside");
    const showIds  =	fav.map(function(show) {
			return show.id;
		});
		dispatch({
			type: "SUBMIT_ORDER_START",
		});
		console.log("submitList( fav)", fav.name, [show.id], show.showIds);
		API.post('/fav', {
			args: {
				name: show.name,
				summary: show.summary,
				time: show.time,
				days: show.days,
        shows: showIds,
      },
		})
			.then((res) => {
				if (res.data) {
					console.log("submitOrder(success)",res);
					dispatch({
						type: "SUBMIT_ORDER_SUCCESS",
						data: res.data,
						show,
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
