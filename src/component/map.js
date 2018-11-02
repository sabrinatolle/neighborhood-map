import React, {Component} from "react";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
// mounts google maps 
const MyMapComponent = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap 
        defaultZoom={8}
        //getting zoom set to 12
        zoom={props.zoom}
        defaultCenter={{lat: -34.397, lng: 150.644}}
        center={props.center} 
        >
        {/* shows the markers of results on map*/}
         {props.markers && 
         props.markers
         .filter(marker => marker.isVisible)
         .map((marker,idx)=>(
        <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng}} />
         ))}
        </GoogleMap>
    ))
);


export default class Map extends Component {
    render() {
        return (<MyMapComponent
        {...this.props}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAx4-7otl16MjOrkoX2K8ukjODsWbKROTs"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />);
    
    }
}
