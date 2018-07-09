import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
} from 'reactstrap';

import { fetchCharacter } from '../../actions';
import { Wrapper, CharacterBox } from '../../components';
import { GET_ALL_CHARACTER } from '../../constants';

class HomePage extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      page: 1,
      prevY: 0,
      loading: false,
      hasFiltered: false
    }
  }
  
  componentDidMount() {
    this.props.fetchCharacter({ url: `people/?page=${this.state.page}`, type: GET_ALL_CHARACTER });
    let options = {
      root: null, 
      rootMargin: '0px',
      threshold: 1.0
    };
    // Create an observer instance
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this), // pass the callback
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const { character } = this.props;
    const y = entities[0].boundingClientRect.y;
    if (character.listCharacter.status_code !== 404 && character.listCharacter.error !== "Not found") {
      if (this.state.prevY > y) {
        const curPage = this.state.page + 1;
        this.props.fetchCharacter({ url: `people/?page=${curPage}`, type: GET_ALL_CHARACTER });
        this.setState({ page: curPage, loading: true });
      }
      this.setState({ prevY: y });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listCharacter, filterBy, hasFiltered } = nextProps.character;
    const { character } = this.props;
    if (listCharacter.status_code === 404 && listCharacter.error === "Not found") {
      this.setState({
        loading: false
      })
    }
  }

  renderDataSource() {
    const { isFetch, listCharacter: { status_code, data } } = this.props.character;
    if (isFetch && !data.length) {
      return <Wrapper><h3>Loading...</h3></Wrapper>
    } 
    return (
      <Row>
        {data.map((item, index) => (
          <CharacterBox 
            key={index} 
            idCharacter={++index} 
          >
            <a href={`character/${++index}`} title={`${item.name}`}>
              <div  className="child__wrap" style={{ padding: '10px', margin: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>
                <h2>{item.name}</h2>
                <div className="char__desc">
                  <p>Gender: {item.gender}</p>
                  <p>Height: {item.height}</p>
                  <p>Birth: {item.birth_year}</p>
                  <p>Skin Color: {item.skin_color}</p>
                </div>
              </div>
            </a>
          </CharacterBox>
        ))}
      </Row>
    )
  }

  render() {
    const loadingTextCSS = { display: this.state.loading ? 'block' : 'none' };
    const loadingCSS = {
      height: '100px',
      margin: '30px'
    };
    return (
      <Wrapper>
        { this.renderDataSource() }
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </Wrapper>
    );
  }
};

const mapStateToProps = state => ({
  character: state.charReducer
});

const mapDispatchToProps = dispatch => ({
  fetchCharacter: (params) => dispatch(fetchCharacter(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
