import React, { Component } from "react";
// import PRODUCTS from "json/products.json";
//import EmptyCart from "components/Checkout";
//import { addToCart } from "actions/cart";
import Loader from "components/Loader";
import { loadShow } from "actions/search";
import { connect } from "react-redux";
// import { connect } from "redux-thunk";

class Show extends Component {
	componentDidMount() {
		this.props.loadShow(this.props.showId);
    console.log(this.props.showId, this.props,'ALEX ALEX');
  }

	_handleAddCart = (show) => {
		this.props.addToSelect(this.props.show.id);
	}

	render() {
		 // const item = PRODUCTS[this.state.itemId];
		 console.log(show,"ffffffffffffffffffff");
		const { show, error, } = this.props;
		if (!show) {
			 return <Loader/>;
		 }
		 else {
		 return (
			 <div className="item">
				 {/* <h1>{this.state.itemId}</h1> */}
				 <h1 className = "show-name">{show.show.name}</h1>
				 <div className = "show-image">
				 {/* {show.map((show) => { */}
				 {/* return [ */}
					  <h1 className = "show-name"><span>Name:</span> {show.show.name}</h1>
					  {/* <img src = {show.medium} className = "img"/>, */}
					 {/* ]; */}
			   {/* })} */}
					</div>
					<button className="add" onClick={this._handleAdd} value={show.id}>
				add Show
			  </button>
					<div className = "text">
				 <p className= "schedule"><span>Schedule:</span> {show.show.schedule.days}</p>
				 <p className= "time"><span>Time:</span> {show.show.schedule.time}</p>
				 <p className= "network-name"><span>Network Name:</span> {show.show.network.name}</p>
				 <p className= "summary"><span>Summary:</span> {show.show.summary}</p>
			 </div>

				</div>
			);
		}
	}
}

function mapStateToProps(state, props) {
	const { activeShow, error, isLoading } = state.search;
	return {
		showId: props.match.params.showId,
		show: activeShow,
		error,
    isLoading,

    //cart: state.cart,

	};
}



export default connect(mapStateToProps, { loadShow })(Show);
