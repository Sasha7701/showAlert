import React, { Component } from "react";
// import PRODUCTS from "json/products.json";
//import EmptyCart from "components/Checkout";
import { addToCart } from "actions/fav";
import Loader from "components/Loader";
import { loadShow } from "actions/search";
import { connect } from "react-redux";


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
			 <div className="show">
				 <h1 className = "show-name">{show.show.name}</h1>
				 <div className = "show-image">
				 {/* {show.map((show) => { */}
				 {/* return [ */}
					 <img className= "tvShow-image-main" src={show.show.image ? show.show.image.medium : ''}/>
					 	<h3 className= "schedule"> Genres: {show.show.genres + ""}</h3>
						<h3 className= "schedule"> Days: {show.show.schedule.days}</h3>
						<h3 className= "time"> Time: {show.show.schedule.time}</h3>
						<h3 className= "network-name"> Network: {show.show.network.name}</h3>
						<h3 className= "summary">Summary: {show.show.summary}</h3>
					 {/* ]; */}
			   {/* })} */}
					</div>
					<button className="add" onClick={this._handleAddCart} value={show.id}>
				add Show
					</button>

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
