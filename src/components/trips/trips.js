import React, { Component } from 'react'
import './trips.css';
import Truck from "./images/truck.svg";

export default class Trips extends Component {
  state = {
    trips: null,
  };
	componentDidMount() {
    fetch(`${process.env.REACT_APP_BACK_END_API}/trips`)
      .then(response => response.json())
      .then(data => this.setState({ trips: data.data  }));
	}
	render() {
    const { trips } = this.state;
		return (
      <section className='trips-wrapper'>
        {
          trips &&
          trips.map((trip, index) => (
          <div key={index}>
            <a href={`trips/${trip.id}`}>
              <div className="car-motion">
                <div className="car-motion__wrapper">
                  <img src={Truck} alt='Truck' />
                </div>
              </div>
              <p>Trip Number: {trip.id}</p>
            </a>
          </div>
          ))
        }
      </section>
		)
	}
}
