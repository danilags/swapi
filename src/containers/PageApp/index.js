import React from 'react';
import { Switch } from 'react-router-dom';

import { NavBar } from '../../components';
import Route from '../Route';

class PageApp extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          {this.props.routes.map((route, i) => (
              <Route key={i} {...route} />
          ))}
        </Switch>
        <div>
          <h3>Footer</h3>
        </div>
      </div>
    )
  }
}

export default PageApp;
