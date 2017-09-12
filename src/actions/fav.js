
export function addToCart(show) {
console.log( show.show.id, 'tyhetyhteyhetyhetyhjetjrt');
	return (dispatch) => {
		if (show) {
      console.log( show.show.id, "FAVORITE");
      dispatch({
				type: "ADD_TO_FAV",
				show,
				showId: show.show.id,

      });
		}
		else {
			 dispatch ({
				type: "CANT_ADD_TO_CART",
				error: "Failed to add to cart!",
			});
		}
	};
}
