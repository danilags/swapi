import React from 'react';
import {
  Col
} from 'reactstrap';

const CharacterBox = (props) => (
  <Col xs={6} md={6}>
    { props.children }
  </Col>
);

export default CharacterBox;
