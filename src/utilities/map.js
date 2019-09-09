/* global google */
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

class MapDirectionsRenderer extends React.Component {
  state = {
    directions: null,
    error: null
  };

  componentDidMount() {
    const { places, travelMode } = this.props;
    
    const waypoints = places.map(p =>({
        location: {lat: Number(p.lat), lng: Number(p.long)},
        stopover: true
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
    if (this.state.error) {
      return <h1>{this.state.error.status}</h1>;
    }
    return (this.state.directions && <DirectionsRenderer directions={this.state.directions} />)
  }
}

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      {props.markers.map((marker, index) => {
        const position = { lat: Number(marker.lat), lng: Number(marker.long) };
        return <Marker key={index} position={position}/>;
      })}
      <MapDirectionsRenderer
        places={props.markers}
        travelMode={google.maps.TravelMode.DRIVING}
      />
    </GoogleMap>
  ))
);

export default Map;
