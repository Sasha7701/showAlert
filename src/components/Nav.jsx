import "./Nav.scss";
import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";




class Navigation extends Component {
	render() {
		const links = [{
			to: "/search",
			text: "Search",
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
				{links.map((link) => {
					return (
						<NavLink
							key={link.to}
							to={link.to}
							className="Nav-link"
							activeClassName="is-active"
							exact
						>
							{link.text}
						</NavLink>
					);
				})}
			</nav>
		);
	}
}

export default Navigation;
