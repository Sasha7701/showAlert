import "./App.scss";
import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import Navigation from "components/Nav";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import Search from "pages/Search";
import Show from "pages/Show";
import Home from "pages/Home";
import Fav from "pages/Fav";
import Saved from "pages/Saved";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						{/* <Link to="/" className="App-title">
							<h1>Show Search</h1>
						</Link> */}

						<Switch>
							<Route exact path="/home" component={Home} />
							<Route exact path="/Search" component={Search} />
							<Route exact path="/Show/:showId" component={Show}/>
							<Route exact path="/Fav" component={Fav} />
							<Route exact path="/Saved" component={Saved} />
						</Switch>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
