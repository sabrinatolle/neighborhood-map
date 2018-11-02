import React, { Component } from 'react';

import './App.css';
import Map from "./component/map.js";
import SquareAPI from "./api/";

class App extends Component {
  componentDidMount() {
    SquareAPI.search({
      near: "Columbia,SC",
      query: "tacos",
      limit: 10
    }).then(results => console.log(results));
  }
  render() {
    return (
      <div className="App">
        <Map />
        </div>
    );
  }
}

export default App;
