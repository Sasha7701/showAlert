import "./Navigation.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class Navigation extends Component {
	render() {


		return (
			<div className="w3">

				<div><li><Link to="/home" className="Main">
					<h1>ShowAlert.com</h1>
				</Link></li></div>

				<ul className="Nav">

					<li><Link to="/cart" className="cart">
				CHART
						<span className = "nav-cartTotalItems">{this.props.cartCount}</span>
					</Link></li>

					<li><Link to="/about" className="about">
				ABOUT
					</Link></li>

					<li><Link to="/" className="home">
				HOME
					</Link></li>

				</ul>
			</div>
		);
	}
}

export default Navigation;
