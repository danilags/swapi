import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
} from 'reactstrap';

import { fetchCharacter } from '../../actions';
import { Wrapper, CharacterBox } from '../../components';

class HomePage extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      listChar: [],
      tmpListChar: [],
      page: 1,
      prevY: 0,
      loading: false
    }
  }
  
  componentDidMount() {
    this.props.fetchCharacter({ page: this.state.page });
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
    if (character.listCharacter.status_code !== 404) {
      if (this.state.prevY > y) {
        const curPage = this.state.page + 1;
        this.props.fetchCharacter({ page: curPage });
        this.setState({ page: curPage, loading: true });
      }
      this.setState({ prevY: y });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listCharacter } = nextProps.character;
    const { character } = this.props;
    console.log('PROPS KE BIND ', character);
    console.log('BELUM KE BIND ', listCharacter);
    if (listCharacter.status_code === 200 && listCharacter.nextPage !== character.listCharacter.nextPage) {
      let { listChar } = this.state;
      listCharacter.data.forEach(item => listChar.push(item));
      this.setState({
        listChar,
        loading: !this.state.loading
      })
    } else if (listCharacter.status_code === 404 && listCharacter.error !== character.listCharacter.error) {
      this.setState({
        loading: !this.state.loading
      })
    }
  }

  renderDataSource() {
    const { status_code } = this.props.character.listCharacter;
    const { listChar } = this.state;
    if (!listChar.length) {
      return <Wrapper><h3>Loading...</h3></Wrapper>
    } 
    return (
      <Row>
        {this.state.listChar.map((item, index) => (
          <CharacterBox key={index} onClick={() => alert(item.name)}>
            <h2>{item.name}</h2>
            <div className="char__desc">
              <p>Gender: {item.gender}</p>
              <p>Height: {item.height}</p>
              <p>Birth: {item.birth_year}</p>
              <p>Skin Color: {item.skin_color}</p>
            </div>
          </CharacterBox>
        ))}
      </Row>
    )
  }

  render() {
    console.log('STATE RENDER ', this.state);
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
  fetchCharacter: (params) => dispatch(fetchCharacter(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
