import API from "util/api";

export function searchShows(q) {
	return (dispatch) => {
		dispatch({ type: "SHOWS_SEARCH_START" });
		console.log(q, "llllllll");
		API.get("/search", {
			args: { q },
		}).then((res) => {
			if (res.data) {
				console.log(res.data, "ll8888888888888lll");
				dispatch({
					type: "SHOWS_SEARCH_SUCCESS",
					shows: res.data,

				});
			}
			else {
				dispatch({
					type: "SHOWS_SEARCH_FAILURE",
					error: "Search failed!",
				});
			}
		}).catch((err) => {
console.log(err, "oOOoooooooooooooooooooo");
			dispatch({
				type: "SHOWS_SEARCH_FAILURE",
				error: "Something went wrong, please refresh and try again",
			});
		});
	};
}


export function loadShow(showId) {
	return (dispatch, getStore) => {
		const { shows } = getStore().search;
		console.log(shows, "AAAAAAAAAAAAAAAAA");
		// First check if we have the gif. If we do, serve it right away!
		const cachedShow = shows.find((show) => {
			console.log("SHOW:", show);
			console.log("SHOWID:", showId);

			return parseInt(showId) === show.show.id;
		});
		console.log(cachedShow , 'PPPPPPPPPPP');
		if (cachedShow) {

			return dispatch({
				type: "SHOWS_LOAD_SUCCESS",
				show: cachedShow,
			});
		}

		// Otherwise, request it
		dispatch({ type: "SHOWS_LOAD_START" });

		API.get(`/search/${showId}`).then((res) => {
			if (res.data && res.data.id) {
				dispatch({
					type: "SHOWS_LOAD_SUCCESS",
					show: res.data,

				});
			}
			else {
				dispatch({
					type: "SHOWS_LOAD_FAILURE",
					error: "Unable to find that gif",
				});
			}
		}).catch(() => {
			dispatch({
				type: "SHOWS_LOAD_FAILURE",
				error: "Something went wrong, please refresh and try again",
			});
		});
	};
}
