import React from 'react';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h2>Hello World, Loket!</h2>
        <a href="/myhero/3">
          <p>go to details</p>
        </a>
      </div>
    );
  }
};

export default HomePage;
