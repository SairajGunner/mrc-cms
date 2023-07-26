import "./Header.scss";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserFriends } from "@fortawesome/free-solid-svg-icons";

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-icons">
          <div className="header-home-container">
            <FontAwesomeIcon className="icon-highlight" icon={faHouse} />
          </div>
          <div className="header-customers-container">
            <FontAwesomeIcon icon={faUserFriends} />
          </div>
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
        <div className="header-empty-space"></div>
      </div>
    );
  }
}
