/* global google */

import React, {Component} from "react";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow

} from "react-google-maps";
// mounts google maps 
const MyMapComponent = withScriptjs(
    withGoogleMap((props) => 
        <GoogleMap 
        defaultZoom={8}
        //getting zoom set to 12
        zoom={props.zoom}
        
        center={props.center}
        defaultCenter={{ lat: 41.881832, lng: -87.623177 }}
        >
        
         {props.markers && 
         props.markers
         .filter(marker => marker.isVisible)
         .map((marker,idx, arr) => {
             const venueInfo = props.venues.find(venue => (venue.id === marker.id))
        return (
             <Marker 
        key={idx} 
        position={{ lat: marker.lat, lng: marker.lng}} 
        onclick={() => props.handleMarkerClick(marker)}
        // add animation to markers 
        animation = {arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
        >
            {marker.isOpen && 
            venueInfo.bestPhoto && (
           //grabs photo and venue name 
           <InfoWindow>
           <React.Fragment>
           <div className="info-window">
           <h4>{venueInfo.name}</h4>
           <p>{venueInfo.location.formattedAddress[0]}</p>
           <p>{venueInfo.location.formattedAddress[1]}</p>
           <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`}
               alt={`${venueInfo.name}`} />
           <br></br>
          <a href={`${venueInfo.contact.formattedPhone}`} className="phone">Call: {venueInfo.contact.formattedPhone}</a>
           <br></br>
           <a href={`${venueInfo.url}`} className="website">Website: {venueInfo.Url}</a>
           <br></br>
           <a href={`${venueInfo.url}`} className="fourSquare">FourSquare Info: {venueInfo.shortUrl}</a>
           </div>
           </React.Fragment>
       </InfoWindow>
       )}
   </Marker>
   )
})}
</GoogleMap>
))
    


export default class Map extends Component {
    render() {
        return (
        <MyMapComponent
        {...this.props}
        
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAx4-7otl16MjOrkoX2K8ukjODsWbKROTs"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height:`100%`, width:`75%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        
      />
        );
    
    }
}
