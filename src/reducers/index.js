import { combineReducers } from "redux";
import search from "./search";
import fav from "./fav";
import addFav from "./addFav";

export default combineReducers({
	search, fav, addFav,
});
