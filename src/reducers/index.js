import { combineReducers } from "redux";
import search from "./search";
import fav from "./fav";
import favList from "./favList";

export default combineReducers({
	search, fav, favList,
});
