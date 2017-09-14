import React, { Component } from "react";
import Loader from "components/Loader";
import { dbShow } from "actions/dbShow";
import { connect } from "react-redux";


class Saved extends Component {

  componentDidMount() {
    this.props.dbShow();
    console.log(this.props, 'ALEX ALEX');
  }

	render() {

		 console.log(this.props, "ffffffffffffffffffff");
		const { shows, isLoading, error } = this.props;
     console.log(shows, ":::::::::");
    if (!shows) {
			 return <Loader/>;
		 }
		 else {
		 return (
			 <div className="show">
				 <h1 className = "show-name">{shows}</h1>


			</div>

			);
	}
}
}
function mapStateToProps(state, props) {
const { shows, error, isLoading } = state.dbShow;
	return {
    shows,
  	isLoading,
  	error,

	};
}


export default connect(mapStateToProps, { dbShow }) (Saved);
