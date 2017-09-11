import React, { Component } from "react";
import favList from "../components/favList";
import { connect } from "redux-thunk";

class Checkout extends Component {
	render() {
			return (
			<div className="App">
				<favList/>
			</div>
		);
	}
}
