import React, { Component } from "react";
// import PRODUCTS from "json/products.json";
//import EmptyCart from "components/Checkout";
import { addToCart } from "actions/fav";
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
		this.props.addToCart(this.props.show);

	}

	render() {
		 // const item = PRODUCTS[this.state.itemId];
		 console.log(show, fav, this.props,"ffffffffffffffffffff");
		const { show, fav, error } = this.props;
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
					  <h1 className = "show-name"><span>Name:</span> {show.name}</h1>
					  {/* <img src = {show.medium} className = "img"/>, */}
					 {/* ]; */}
			   {/* })} */}
					</div>
					<button className="add" onClick={this._handleAddCart} value={show.id}>
				add Show
				{console.log(show.fav, show.id, "HEEEEEEEEEEEEEEEEEEEEEEE")}
				</button>

					<div className = "text">
				 {/* <p className= "schedule"><span>Schedule:</span> {show.schedule.days}</p>
				 <p className= "time"><span>Time:</span> {show.show.schedule.time}</p>
				 <p className= "network-name"><span>Network Name:</span> {show.show.network.name}</p>
				 <p className= "summary"><span>Summary:</span> {show.show.summary}</p> */}
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

    fav: state.fav,

	};
}



export default connect(mapStateToProps, { loadShow, addToCart })(Show);
