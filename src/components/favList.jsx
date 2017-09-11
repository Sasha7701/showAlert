import React, { Component } from 'react';


import { connect } from "react-redux";
import { submitOrder } from "actions/favList.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";


class CheckoutForm extends Component {
	constructor(props) {
		super(props); {
			this.state = {
				list: "",
				error: null,
			};
		}
	}

	// handleUpdateInput = (name) => {
	//   this.setState({ [name]: event.target.value }) // event.target = undefined
	// }
	_handleChange = (ev) => {
		this.setState({
			[ev.target.list]: [ev.target.value].toString() });
	}

	_handleSubmit = (ev) => {
		ev.preventDefault();
		const { fav } = this.props;
		this.props.submitOrder(this.state);
	}

	render() {
		const { list, value } = this.state;
		const { error, orderSuccess, orderFailure, fav } = this.props;
		let message;

		if (orderSuccess) {
			message = (<div className = "OrderFormSuccess">
				<Link to= "/search"> <p>Your FAVORITE shows have been submitted successfully! Please feel free to continue to add more shows here if you'd like.</p></Link>
			</div>);
		}

		if (orderFailure) {
			message = <div className = "OrderFormFailure"> { error } </div>;
		}



		return (
<div>
      <form className="save-list" onSubmit={this._handleSubmit}>

          className="Search-form-input"
          placeholder="Search for shows"
          value={this.state.search}
          onChange={this._handleChange}
        />
        <button className="Search-form-submit" type='submit' onChange={this._handleSubmit}>Submit</button>
      </form>

				 <div className="order-message">
					  { message }
				 </div>
</div>
    );
	}
}

CheckoutForm.propTypes = {
	error: PropTypes.string,
	orderSuccess: PropTypes.bool,
	orderFailure: PropTypes.bool,
	cart: PropTypes.arrayOf(PropTypes.shape({
		product: PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			category: PropTypes.string,
			description: PropTypes.string,
			rating: PropTypes.number,
			price: PropTypes.string,
			specs: PropTypes.arrayOf(PropTypes.shape({
				0: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				1: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				2: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				3: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				4: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				5: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				6: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				7: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				8: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				9: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				10: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				11: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				12: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				13: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
				14: PropTypes.shape({
					label: PropTypes.string,
					value: PropTypes.string,
				}),
			})),
			images: PropTypes.arrayOf(PropTypes.shape({
				0: PropTypes.shape({
					original: PropTypes.string,
					small: PropTypes.string,
					medium: PropTypes.string,
					large: PropTypes.string,
				}),
				1: PropTypes.shape({
					original: PropTypes.string,
					small: PropTypes.string,
					medium: PropTypes.string,
					large: PropTypes.string,
				}),
				2: PropTypes.shape({
					original: PropTypes.string,
					small: PropTypes.string,
					medium: PropTypes.string,
					large: PropTypes.string,
				}),
			})),
		}),
	})),
	cartTotalItems: PropTypes.number,
};

function mapStateToProps(state, props) {
	return {
		error: state.checkout.error,
		orderSuccess: state.checkout.orderSuccess,
		orderFailure: state.checkout.orderFailure,
		cart: state.cart.cart,
		cartTotalItems: state.cart.cartTotalItems,

	};
}


export default connect(mapStateToProps, { submitOrder }) (CheckoutForm);
