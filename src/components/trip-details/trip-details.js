import React, { Component } from 'react'
import './trip-details.css';
import Map from '../../utilities/map';
import TruckDetails from './truck-details'

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
      fetch(`${process.env.REACT_APP_BACK_END_API}/trips/${id}`)
        .then(response => response.json())
        .then(response => this.setState({ trip: response.data  }));
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
    const mapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&libraries=geometry,drawing,places`
    return (
      <section className='trip-details__wrapper'>
        <TruckDetails trip={trip} />
        <div className='trip-map'>
          {trip &&
            <Map
              googleMapURL={mapURL}
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


