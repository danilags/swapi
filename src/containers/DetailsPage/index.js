import React from 'react';
import { connect } from 'react-redux';

import { fetchCharacter } from '../../actions';
import { GET_DETAILS_CHARACTER } from '../../constants';

import { Wrapper } from '../../components';

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
    const { characterDetails } = nextProps.dataCharacter
    if (characterDetails.isFulfilled && this.props.dataCharacter.characterDetails === null) {
      this.setState({
        character: characterDetails
      })
    }
  }

  render() {
    return (
      <Wrapper>
        <p>{ this.state.character.name }</p>
        <p>{ this.state.character.birth_year }</p>
        <p>{ this.state.character.gender }</p>
        <p>{ this.state.character.eye_color }</p>
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
