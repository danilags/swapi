import React from 'react';

import { API_CALL } from '../../../utils';
 
class Information extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isFetch: true
    }
  }

  async fetchingApi() {
    const { link } = this.props
    if (link !== undefined) {
      if (link.length === 0) {
        this.setState({
          isFetch: false
        })
      } else {
        for (let i = 0; i < link.length; i++) {
          try {
            const option = {
              method: 'GET',
              url: link[i]
            };
            const res = await API_CALL(option);
            // const { title, release_date, producer, director } = res.data
            // const obj = {
            //   title,
            //   release_date,
            //   producer,
            //   director
            // }
            const lastState = this.state.items;
            lastState.push(res.data);
            this.setState({
              items: lastState,
              isFetch: i === link.length-1 ? false : true
            })
          } catch (error) {
            const errMsg = {
              status_code: 404,
              message: 'Not found'
            };
          }
        }
      }
    }
  }

  componentDidMount() {
    this.fetchingApi();
  }

  renderFilmList() {
    if (this.props.type === "Vehicles") {
      return (
        <div style={{ border: '1px solid #4a4a4a' }}>
           {
             this.state.items.map((item, index) => (
              <span key={index} style={{ background: '#ccc' }}>
                <p>Name : { item.name }</p>
                <p>Vehicle Class : { item.vehicle_class }</p>
                <p>Passengers : { item.passengers }</p>
                <p>Manufacturer : { item.manufacturer }</p>
              </span>
            ))
           }
        </div>
      )
    }
    return (
      <div style={{ border: '1px solid #4a4a4a' }}>
         {
           this.state.items.map((item, index) => (
            <span key={index} style={{ background: '#ccc' }}>
              <p>{item.title}</p>
              <p>{item.release_date}</p>
              <p>{item.producer}</p>
              <p>{item.director}</p>
            </span>
          ))
         }
      </div>
    )
  }

  render() {
    if (this.state.isFetch) {
      return (
        <div>
          <p>Still fetching the { this.props.type } list...</p>
        </div>
      )
    }
    return (
      <div>
      { 
        this.state.items.length === 0 ?
        <p>{  this.props.type } is not found</p>
        :
        this.renderFilmList() 
      }
      </div>
    )    
  }
};

export default Information;
