import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import AppRoute from './containers';
import store from './store'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Provider store={ store }>
  <AppRoute />
</Provider>, document.getElementById('root'));
registerServiceWorker();

// import { render } from 'react-dom';
// import AppRoute from './components/AppRoute/';

// render(
// 	<Provider store={ store }>
// 		<AppRoute />
// 	</Provider>,
// 	document.querySelector('#main'));
