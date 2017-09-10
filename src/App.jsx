import "./App.scss";
import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import Search from "pages/Search";
import Show from "pages/Show";


const store = createStore(reducers, applyMiddleware(reduxThunk));

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Link to="/" className="App-title">
							<h1>Show Search</h1>
						</Link>
						<Switch>
							<Route exact path="/Search" component={Search} />
							<Route exact path="/Show/:showId" component={Show}/>
						</Switch>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
