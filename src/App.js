import React, { Component } from 'react';

import './App.css';
import Map from "./component/map.js";
import SquareAPI from "./api/";

class App extends Component {
  //adding markers
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12
      
    }; 
    
  }
  componentDidMount() {
    SquareAPI.search({
      near: "Columbia, SC",
      query: "Thai",
      limit: 20
    }).then(results => {
      // deconstruct response
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const  markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen:false,
          isVisible:true,
          id: venue.id
        }
        
      })
      this.setState({venues, center, markers});
      console.log(results)
      
    });
  }
  render() {
    return (
      <div className="App">
        <Map {...this.state}/>
        </div>
    );
  }
}

export default App;
