import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchShows } from "actions/search";
import ShowResult from "components/ShowResult";
import "./Search.scss";
import { Link } from "react-router-dom";
import Navigation from "components/Navigation";

class Search extends React.Component {
	state = {
		search: "",
	};

	_handleChange = (ev) => {
		this.setState({ search: ev.target.value });
	};

	_handleSubmit = (ev) => {
		ev.preventDefault();
		this.props.searchShows(this.state.search);
	};

	render() {
		const { shows, isLOADING, error } = this.props;
		let content;
		if (isLOADING) {
			content = <Loader/>;
		}

		else if (!shows) {
			content = <div className = "TV shows-Error">{ error }</div>;
		}

		else {
			content = (

				<div className = "shows">
					{shows.map((show) => {
						console.log(show, "ggggggggggggggggggggggg");
						return [
							<div className = "item">
								<Link key = {show.show.id} to= {`/show/${show.show.id}`}>
									<h3 className = "show-name"> {show.show.name}</h3>
									<img className= "tvShow-image-main" src={show.show.image ? show.show.image.medium : ''}/>
								</Link>
											 <div className= "product-image">

											 <h3 className= "schedule"> {show.show.schedule.days}</h3>
											 <h3 className= "time"> {show.show.schedule.time}</h3>
											 <h3 className= "network-name"> {show.show.network.name}</h3>
											 {/* <h3 className= "summary"> {show.show.summary}</h3> */}
											 </div>
										 </div>];
					})}
				</div>
			);
		}

		return (


			<div className="Search">

				<div className="mainpic">
					<div className="black">
						<Navigation />
				<form className="Search-form" onSubmit={this._handleSubmit}>
					<div className="search-input">
					<input
						className="Search-form-input"
						placeholder="Search for shows"
						value={this.state.search}
						onChange={this._handleChange}
					/>
					<button className="Search-form-submit">Submit</button>
				</div>
				</form>

			</div>
			</div>

			<div className="Search-results">
				{content}
			</div>
			</div>
		);
	}
}

Search.propTypes = {
	// State
	shows: PropTypes.array.isRequired,
	isLoading: PropTypes.bool,

	// Actions
	searchShows: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	const { shows, isLoading } = state.search;

	return {
		shows,
		isLoading,
	};
}

export default connect(mapStateToProps, { searchShows })(Search);
