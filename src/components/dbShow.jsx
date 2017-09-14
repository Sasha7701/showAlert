// import React, { Component } from "react";
// import Loader from "components/Loader";
// import { dbShow } from "actions/dbShow";
// import { connect } from "react-redux";
//
//
// class Show extends Component {
// 	componentDidMount() {
// 		this.props.dbShow(this.props.shows);
//     console.log(this.props.shows, this.props,'ALEX ALEX');
//   }
//
// 	render() {
// 		 // const item = PRODUCTS[this.state.itemId];
// 		 console.log(shows, this.props, "ffffffffffffffffffff");
// 		const { shows } = this.props;
// 		if (!shows) {
// 			 return <Loader/>;
// 		 }
// 		 else {
// 		 return (
// 			 <div className="show">
// 				 <h1 className = "show-name">{shows.show.name}</h1>
// 				 <div className = "show-image">
// 				 {/* {show.map((show) => { */}
// 				 {/* return [ */}
// 					 {/* <img className= "tvShow-image-main" src={shows.show.image ? shows.show.image.medium : ''}/> */}
// 					 	<h3 className= "schedule"> Genres: {shows.show.genres + ""}</h3>
// 						{/* <h3 className= "schedule"> Days: {show.show.schedule.days}</h3>
// 						<h3 className= "time"> Time: {show.show.schedule.time}</h3>
// 						<h3 className= "network-name"> Network: {show.show.network.name}</h3>
// 						<h3 className= "summary">Summary: {show.show.summary}</h3> */}
// 					 {/* ]; */}
// 			   {/* })} */}
// 					</div>
//
// 			</div>
// 			);
// 		}
// 	}
// }
//
// function mapStateToProps(state, props) {
//
// 	return {
// 		shows: this.shows,
//
//
// 	};
// }
//
//
//
// export default connect(mapStateToProps)(dbShow);
