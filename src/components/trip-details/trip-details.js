import React, { Component } from 'react'
import './trip-details.css';
import Map from '../../utilities/map';

export default class TripDetails extends Component {
  state = {
    trip: null
  };
  componentDidMount() {
    const {
      match: { path },
    } = this.props;
    if (path === '/trips/:id') {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      console.log(id)
      fetch(`${process.env.REACT_APP_BACK_END_API}/trips/${id}`)
        .then(response => response.json())
        .then(data => this.setState({ trip: data.data  }));
    }
  }

  render() {
    const { trip } = this.state;
    const {
      loadingElement,
      containerElement,
      mapElement,
      defaultCenter,
      defaultZoom,
    } = this.props;
    return (
      <section className='trip-details__wrapper'>
        <div className='trip-details'>
          <h2> Trip Details</h2>
          <p>Trip Duration: {trip && trip.trip_duration} minutes</p>
          <h2>Truck Details</h2>
          <p>Truck Type: {trip && trip.truck.truck_type}</p>
          <p>Truck License: {trip && trip.truck.license_number}</p>
          <p>Trip notes: {trip && trip.trip.notes}</p>
        </div>
        <div className='trip-map'>
          {
            trip &&
            <Map
              googleMapURL={
                'https://maps.googleapis.com/maps/api/js?key=' +
                process.env.REACT_APP_MAPS_API_KEY +
                '&libraries=geometry,drawing,places'
              }
              markers={trip.routes}
              loadingElement={loadingElement || <div className='map-loading' />}
              containerElement={containerElement || <div className='map-container'/>}
              mapElement={mapElement || <div className='map'/>}
              defaultCenter={defaultCenter || {lat: 25.798939, lng: -80.291409}}
              defaultZoom={defaultZoom || 11}
            />
          }
        </div>
      </section>
      
    )
  }
}


