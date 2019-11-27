import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router  } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { createBrowserHistory } from 'history';
import App from './App';

const customHistory = createBrowserHistory();

const store = configureStore();


ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Router history={customHistory}>
				<App />
			</Router>
		</Provider>
	</BrowserRouter>
	, document.getElementById('root'));

