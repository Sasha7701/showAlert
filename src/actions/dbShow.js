import API from "util/api";

export function dbShow(){

  return (dispatch) => {
		dispatch({ type: "SHOWS_DID_START" });
		API.get("/saved").then((res) => {
			console.log(" getAll() action/function   res.data: ", res.data.shows);
			if (res.data) {
				dispatch({
					type: "SHOWS_SHOWS_SUCCESS",
					shows: res.data,
				});
			}
			else {
				dispatch({
					type: "SHOWS_ALL_FAILURE",
					error: res.error.message,
				});
			}
		}).catch((error) => {
			dispatch({
				type: "PRODUCTS_CANT_LOAD",
				error: "Something failed",
			});
		});
	};
}
