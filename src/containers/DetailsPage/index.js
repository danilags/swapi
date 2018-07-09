import React from 'react';
import { connect } from 'react-redux';
import {
  Row, 
  Col
} from 'reactstrap';

import { fetchCharacter } from '../../actions';
import { GET_DETAILS_CHARACTER } from '../../constants';

import { Wrapper } from '../../components';
import Details from './Details';

class DetailsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      characterId: this.props.match.params.id,
      character: {}

    }
  }

  componentDidMount() {
    this.props.fetchCharacter({ url: `people/${this.state.characterId}`, type: GET_DETAILS_CHARACTER })
  }

  componentWillReceiveProps(nextProps) {
    const { characterDetails, isFetch } = nextProps.dataCharacter
    if (!isFetch && this.props.dataCharacter.characterDetails === null) {
      this.setState({
        character: characterDetails
      })
    }
  }

  render() {
    const { isFetch } = this.props.dataCharacter;
    if (isFetch) {
      return <Wrapper><p>Loading...</p></Wrapper>
    }
    return (
      <Wrapper>
        <p>Name : { this.state.character.name }</p>
        <p>Birthday : { this.state.character.birth_year }</p>
        <p>Gender : { this.state.character.gender }</p>
        <p>Eye Color: { this.state.character.eye_color }</p>
        <Details 
          films={this.state.character.films}
          vehicles={this.state.character.vehicles}
        />
      </Wrapper>
    );
  }
};

const mapStateToProps = state => ({
  dataCharacter: state.charReducer
});

const mapDispatchToProps = dispatch => ({
  fetchCharacter: (params) => dispatch(fetchCharacter(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
