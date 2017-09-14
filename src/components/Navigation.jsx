import "./Navigation.scss";
import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";




class Navigation extends Component {
	render() {
		const links = [{
			to: "/search",
			text: "Search",
		},	{
			to: "/show",
			text: "Show",
		}, {
			to: "/fav",
			text: "Favorites",
		},{
			to: "/saved",
			text: "Saved",
		},
		];


		return (
			<nav className="Nav">

				<header id="header">
						<h1><a href="">Show <i>Alert</i></a></h1>
						<nav id="nav">
							<ul>
								<li><Link to="/home" className="home">Home</Link></li>
								<li><Link to="/search" className="search">Search</Link></li>
								<li><Link to="/fav" className="fav">Favorite</Link></li>
								<li><Link to="/saved" className="user">Saved</Link></li>
							</ul>
						</nav>
					</header>
			</nav>
		);
	}
}

export default Navigation;
