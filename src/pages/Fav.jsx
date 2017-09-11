//import "./Cart.scss";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";


class Fav extends Component {
	 constructor(props) {
	 	super(props);
		this.state = {
      fav: [],
		};
	}

	render() {
		const { fav } = this.props;
console.log(fav, "RPRPRPRPRPRPRPRPRPRRPRPRPRPRPRPR");
    // const totalPrice = cart.reduce(function(prev, item) {
		// 	return prev + parseFloat(item.price);
		// },0);

		return (
			<div className="cartCount">

				{fav.map((show) => {
					return (
						<div className = "show_info">
							  <h3 className = "show-name"> {show.show.name}</h3>
						<img className= "tvShow-image-main" src={show.show.image ? show.show.image.medium : ''}/>
          	</div>
					);
			 })}

		 <div className="cart-checkout-button">
	 						<Link to= "/favList">
	 							<button> List </button>
	 						</Link>
	 					</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		//cartCount: state.cart.cartCount,
		fav: state.fav.fav,
	};
}

export default connect (mapStateToProps) (Fav);
