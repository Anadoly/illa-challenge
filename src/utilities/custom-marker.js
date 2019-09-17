import React, { Component } from 'react';
import { Marker,InfoWindow } from "react-google-maps";
import PropTypes from 'prop-types';

class CustomMarker extends Component{
  state = {
    showInfo: false
  }
  onMouseOver = ()=>{
    this.setState({showInfo: true})
  }
  onMouseOut = () =>{
    this.setState({showInfo: false})
  }
  render(){
    const { showInfo } = this.state;
    const { marker} = this.props;
    const position = { lat: Number(marker.lat), lng: Number(marker.lng) }; 
    const moving_time = new Date(marker.moving_time);
    const arrival_time = new Date(marker.arrival_time);
    let Difference_In_Time = moving_time.getTime() - arrival_time.getTime();
    const hours = Math.floor(Difference_In_Time / 1000 / 60 / 60);
    Difference_In_Time -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(Difference_In_Time / 1000 / 60);

    return(
      <Marker
        key={JSON.stringify(marker)}
        position={position}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        {showInfo && (
          <InfoWindow>
            <p style={{color: '#000'}}>The truck was waiting for {hours > 0 ? `${hours} hours and` : '' } {minutes}  minutes</p>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

CustomMarker.propTypes = {
  marker: PropTypes.object.isRequired,
};


export default CustomMarker;