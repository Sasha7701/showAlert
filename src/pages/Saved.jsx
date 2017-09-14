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
    if (shows && shows.shows) {
      return (
      <div>{shows.shows.map((show) => {
         console.log( shows.shows,"DDDDDDDDDDDDDDDDDDDDDDDDDDD");
         return (
           <div className="show">
             <h1 className = "show-name">{show.name}</h1>
           </div>);
      })
      }
      </div>);

		 }
		 else {
       return <Loader/>;
    }
  }

}

function mapStateToProps(state, props) {
const { shows, error, isLoading } = state.dbShow;
	return {
    shows: shows,
  	isLoading,
  	error,

	};
}


export default connect(mapStateToProps, { dbShow }) (Saved);
