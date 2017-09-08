import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchShows } from "actions/search";
import ShowResult from "components/ShowResult";
import Loader from "components/Loader";

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
		 let content;

		if (this.props.isLoading) {
			content = <Loader/>;
		}
		else {
			console.log(this.props.shows, "fthdtghdfhdfghdthdfhjdyfhjfyghj");
			content =
			this.props.shows.map((col) => {
				return (
					<div className="Search-results-column column">
						{this.props.shows}
							)
						}
					</div>
				);
			});
		}

		return (
			<div className="Search">
				<form className="Search-form" onSubmit={this._handleSubmit}>
					<input
						className="Search-form-input"
						placeholder="Search for shows"
						value={this.state.search}
						onChange={this._handleChange}
					/>
					<button className="Search-form-submit">Submit</button>
				</form>

				<div className="Search-results columns">
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
