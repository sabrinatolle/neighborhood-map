import React, {Component} from "react";
import VenueList from './VenueList';

export default class SideBar extends Component {
    render() {
        return (
        <div className="sideBar">
        <input type={"search"} id={"search"} placeholder={"Filter Venues"} />
         <VenueList />
        </div>)
    }
}