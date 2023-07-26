import "./Header.scss";
import { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-icons">
          <div className="header-home-container">Home</div>
          <div className="header-customers-container">Customers</div>
        </div>
        <div className="header-search">
          <div className="header-search-text-container">Search</div>
          <div className="header-search-bar-container">
            <input
              id="searchInput"
              type="text"
              placeholder="Search Customers, Engagements or Notes"
            ></input>
          </div>
        </div>
      </div>
    );
  }
}
