import API from "util/api";

export function searchShows(q) {
	return (dispatch) => {
		dispatch({ type: "GIFS_SEARCH_START" });

		API.get("/gifs/search", {
			args: { q },
		}).then((res) => {
			if (res.data) {
				dispatch({
					type: "GIFS_SEARCH_SUCCESS",
					gifs: res.data,
				});
			}
			else {
				dispatch({
					type: "GIFS_SEARCH_FAILURE",
					error: "Search failed!",
				});
			}
		}).catch((err) => {
			dispatch({
				type: "GIFS_SEARCH_FAILURE",
				error: "Something went wrong, please refresh and try again",
			});
		});
	};
}
