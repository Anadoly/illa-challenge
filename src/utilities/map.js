/* global google */
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  DirectionsRenderer,
} from "react-google-maps";
import PropTypes from 'prop-types';
import CustomMarker from './custom-marker'

class MapDirectionsRenderer extends React.Component {
  state = {
    directions: null,
    error: null
  };

  componentDidMount() {
    const { places, travelMode } = this.props;
    const waypoints = places.map(p =>({
        location: {lat: Number(p.lat), lng: Number(p.lng)},
        stopover: false,
    }))
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          this.setState({ error: result });
        }
      }
    );
  }

  render() {
    const { error, directions } = this.state;
    if (error) {
      return <h1>{error.status}</h1>;
    }
    return (directions && <DirectionsRenderer directions={directions} />)
  }
}



const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom} 
    >
      {props.markers.map((marker, index) => {
        return ((index !==0 && index !== props.markers.length-1) ? <CustomMarker key={index} marker={marker}/> : null)
      })}
      <MapDirectionsRenderer
        places={props.markers}
        travelMode={google.maps.TravelMode.DRIVING}
      />
    </GoogleMap>
  ))
);

Map.propTypes = {
  defaultCenter: PropTypes.object.isRequired,
  defaultZoom: PropTypes.number.isRequired,
  markers: PropTypes.array.isRequired,
  loadingElement: PropTypes.object.isRequired,
  containerElement: PropTypes.object.isRequired,
  mapElement: PropTypes.object.isRequired,
  googleMapURL: PropTypes.string.isRequired, 
};

MapDirectionsRenderer.propTypes = { 
  places: PropTypes.array.isRequired,
  travelMode: PropTypes.string.isRequired,
}

export default Map;
