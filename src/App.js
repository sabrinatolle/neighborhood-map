import React, { Component } from 'react';

import './App.css';
import Map from "./component/map.js";
import SquareAPI from "./api/";
import SideBar from "./component/SideBar";

class App extends Component {
  //adding markers
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
      
    }; 
    
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      //allows only one marker to be open at a time
      marker.isOpen = false;
      //marker.clickOnMarker = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)});
  };

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers,marker)});
    
    const venue = this.state.venues.find(venue => venue.id === marker.id);
   //gets info from FourSquare about each venue for infoWindow
    SquareAPI.getVenueDetails(marker.id)
    .then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue)});
      
    })
    .catch(error => {
      this.setState({error})
      console.log(this.state.error)
    })
  };

 handleListItemClick = venue => {
   const marker = this.state.markers.find(marker => marker.id === venue.id);
   this.handleMarkerClick(marker);
  };

  componentDidMount() {
    SquareAPI.search({
      near: "Columbia, SC",
      query: "Chinese",
      limit: 10
    })
    
    .then(results => {
      // deconstruct response
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const  markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          title: venue.name,
          isOpen:false,
          isVisible:true,
          id: venue.id,
          name:venue.name,
          address: venue.location.address
        };
        
      });
      this.setState({venues, center, markers});
      console.log(results)
      
    });
  }

    
  render() {
    return (
      <div className="App">
       <SideBar {...this.state} handleListItemClick={this.handleListItemClick} />
         <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
          </div>
        
      
    );
  }
}

export default App;