import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import './App.css';
import AppRoute from './containers';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <AppRoute />
      </Provider>
    );
  }
}

export default App;
