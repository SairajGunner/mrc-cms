import "./Header.scss";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-icons">
          <NavLink
            to={"/"}
            className={(status) => {
              return status.isActive ? "icon-selected" : "icon";
            }}
          >
            <div className="header-home-container">
              <FontAwesomeIcon icon={faHouse} />
            </div>
          </NavLink>

          <NavLink
            to={"/add-customer"}
            className={(status) => {
              return status.isActive ? "icon-selected" : "icon";
            }}
          >
            <div className="header-customers-container">
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
          </NavLink>
        </div>
        <div className="header-search">
          <div className="header-search-text-container">Search</div>
          <div className="header-search-bar-container">
            <NavLink to={"/search-results"}>
              <input
                id="searchInput"
                type="text"
                placeholder="Search customers, engagements and notes"
              ></input>
            </NavLink>
          </div>
        </div>
        <div className="header-empty-space"></div>
      </div>
    );
  }
}
