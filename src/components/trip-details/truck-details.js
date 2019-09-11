import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TruckDetails extends Component {
  render() {
    const {trip} = this.props;
    return (
      <div className='trip-details'>
        {trip &&
          <>
            <h2> Trip Details</h2>
            <p>Trip Duration: {trip.trip_duration.hours}H {trip.trip_duration.minutes}M {trip.trip_duration.seconds}S</p>
            <h2>Truck Details</h2>
            <p>Truck Type: {trip.truck.truck_type}</p>
            <p>Truck License: {trip.truck.license_number}</p>
            <p>Trip notes: {trip.trip.notes}</p>
            <h2> Driver Details</h2>
            <p>Driver Name: {trip.driver.name}</p>
            <p>Driver phone: <a href={`tel:${trip.driver.phone_number}`}>{trip.driver.phone_number}</a></p>
          </>
        }
      </div>
    )
  }
}

TruckDetails.propTypes = {
  trip: PropTypes.object.isRequired,
}
