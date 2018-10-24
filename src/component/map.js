import React, {Component} from "react";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

const MyMapComponent = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap defaultZoom={0} defaultCenter={{lat: -34.397, lng: 150.644}}>
         {props.isMarkerShown && (
             <Marker position={{ lat: -34.397, lng: 150.644}} />
         )}
        </GoogleMap>
    ))
);

export default class Map extends Component {
    render() {
        return (<h1></h1>)
    }
}