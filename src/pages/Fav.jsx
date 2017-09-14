//import "./Cart.scss";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addToFav } from "actions/addFav.js";


class Fav extends Component {
	 constructor(props) {
	 	super(props);
		this.state = {
      fav: [],
      show: {},
      error: null,
    };
	}

_handleAddCart = (fav) => {
  this.props.addToFav(this.props.fav);

}

	render() {
		const { fav, show, orderSuccess, orderFailure, error } = this.props;
    console.log(fav, show, "RPRPRPRPRPRPRPRPRPRRPRPRPRPRPRPR");

		return (
			<div className="favList">

				{fav.map((show) => {
					return (
						<div className = "show_info">
							  <h1 className = "show-name"> {show.show.name}</h1>
						<img className= "tvShow-image-main" src={show.show.image ? show.show.image.medium : ''}/>
            <h3 className= "schedule"> Days: {show.show.schedule.days}</h3>
						<h3 className= "time"> Time: {show.show.schedule.time}</h3>
						<h3 className= "network-name"> Network: {show.show.network.name}</h3>
            </div>
					);
			 })}

       <div className="favorite-add-button">
                <button className="add" name={addToFav} onClick={this._handleAddCart} value={this.props.show}>
                  ADD TO FAVORITE
                </button>

   							{ console.log(fav) }
   							</div>
          </div>
	         );
}
}

function mapStateToProps(state, props) {
	return {
    error: state.error,
		orderSuccess: state.orderSuccess,
		orderFailure: state.orderFailure,
    fav: state.fav.fav,
	};
}

export default connect (mapStateToProps, {addToFav}) (Fav);
