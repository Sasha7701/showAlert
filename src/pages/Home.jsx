import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchShows } from "actions/search";
import ShowResult from "components/ShowResult";
import "./Home.scss";
import { Link } from "react-router-dom";


class Home extends React.Component {

	render() {
		return (
		<div className="" >
		{/* <header id="header">
				<h1><a href="">Show <i>Alert</i></a></h1>
				<nav id="nav">
					<ul>
						<li><a href="/home">Home</a></li>
						<li><a href="/search">Search</a></li>
						<li><a href="/fav">Favorite</a></li>
						<li><a href="#" className="button special">New Shows</a></li>
					</ul>
				</nav>
			</header> */}

			<section id="banner">
				<h2>Hi. This is Show Alert.</h2>
				<p>The ultimate Place to Go So You Dont Forget Your Favorite TV Shows.</p>
				<ul className="actions">
					<li>
						<a href="/search" className="button big">Search TV Shows </a>
					</li>
				</ul>
			</section>


			<section id="one" className="wrapper style1 special">
				<div className="container">
					<div className="developer">
					<header className="major">
						<h2>DEVELOPERS PROFILES</h2>
						<p>Show alert was creacted by two FULL STACK DEVELOPERS, check them out!</p>
					</header>
				</div>
					<div className="row 150%">
						<div className="4u 12u$(medium)">
							<section className="box">
								<i className="icon big rounded color1 fa-cloud"></i>
								<h3>Donald Tofuah</h3>
								<p>Donald is a Web developer with strong front end and back end skills. Click to read more and contact</p>
							</section>
						</div>
						<div className="4u 12u$(medium)">
							<section className="box">
								<i className="icon big rounded color9 fa-desktop"></i>
								<h3>Alex Polotsky</h3>
								<p>Alex is a Web developer with strong front end and back end skills. Click to read more and conta</p>
							</section>
						</div>
					</div>
				</div>
			</section>


			<section id="two" className="wrapper style2 special">
				<div className="container">
					<header className="major">
						<h1>NEW EPISONDS HERE</h1>
						<p>Take a look at up and coming TV shows that will hit your screens this Winter</p>
					</header>

					<footer>

						<ul className="actions">
							<li>
								<a href="#" className="button big">UP COMMING SHOWS</a>
							</li>
						</ul>
					</footer>
				</div>
			</section>


			<section id="three" className="wrapper style3 special">
				<div className="container">
					<header className="major">
						<h2>SEND US AN EMAIL</h2>
						<p>Message us with any questions or concerns you might have</p>
					</header>
				</div>
				<div className="container 50%">
					<form action="#" method="post">
						<div className="row uniform">
							<div className="6u 12u$(small)">
								<input name="name" id="name" value="" placeholder="Name" type="text"/>
							</div>
							<div className="6u$ 12u$(small)">
								<input name="email" id="email" value="" placeholder="Email" type="email"/>
							</div>
							<div className="12u$">
								<textarea name="message" id="message" placeholder="Message" rows="6"></textarea>
							</div>
							<div className="12u$">
								<ul className="actions">
									<li><input value="Send Message" className="special big" type="submit"/></li>
								</ul>
							</div>
						</div>
					</form>
				</div>
			</section>

			<footer id="footer">
				<div className="container">
					<div className="row">
						<div className="8u 12u$(medium)">
							<ul className="copyright">
								<li>&copy; Untitled. All rights reserved by the Alert Show Team.</li>
								<li>Design: <a href="http://templated.co">by Donald and Alex</a></li>
								<li>Images: <a href="http://unsplash.com">Unsplash</a></li>
							</ul>
						</div>
						<div className="4u$ 12u$(medium)">
							<ul className="icons">
								<li>
									<a className="icon rounded fa-facebook">F<span className="label">Facebook</span></a>
								</li>
								<li>
									<a className="icon rounded fa-twitter">T<span className="label">Twitter</span></a>
								</li>
								<li>
									<a className="icon rounded fa-google-plus">G<span className="label">Google+</span></a>
								</li>
								<li>
									<a className="icon rounded fa-linkedin">L<span className="label">LinkedIn</span></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
	}
}
export default Home;
