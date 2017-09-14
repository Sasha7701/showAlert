import { combineReducers } from "redux";
import search from "./search";
import fav from "./fav";
import addFav from "./addFav";
import dbShow from "./dbShow";

export default combineReducers({
	search, addFav, fav, dbShow,
});
