import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import { filterCharacter } from '../../actions';
import { NavBar } from '../../components';
import Route from '../Route';

class PageApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.toFIlterCharacter = this.toFIlterCharacter.bind(this);
  }

  toFIlterCharacter(params) {
    this.props.filterCharacter(params)
  }

  render() {
    return (
      <div>
        <NavBar 
          onFilter={this.toFIlterCharacter}
        />
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

const mapStateToProps = state => ({
  dataCharacter: state.charReducer
});

const mapDispatchToProps = dispatch => ({
  filterCharacter: (params) => dispatch(filterCharacter(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(PageApp);
