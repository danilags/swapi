import React from 'react';
import {
  Row,
  Col
} from 'reactstrap';

import Information from './Information';

class Details extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <Information 
            link={this.props.films} 
            type="Film"
          />
        </Col>
        <Col>
          <Information 
            link={this.props.vehicles} 
            type="Vehicles"
          />
        </Col>
      </Row>
    )
  }
}

export default Details;
