import "./Header.scss";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { BackupAPI } from "../../services/backup-service";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }

  checkEnter = (e) => {
    if (e.key === "Enter") {
      this.props.setQuery(this.state.searchInput);
    }
  };

  setQueryText = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createBackup = () => {
    BackupAPI.createBackup().then((response) => {
      if (response.ok) console.log("Backup Completed!");
    });
  };

  render() {
    return (
      <div className="header-container">
        <div className="header-icons">
          <NavLink
            id="header-home-navlink"
            to={"/"}
            className={(status) => {
              return status.isActive ? "icon-selected" : "icon";
            }}
          >
            <div className="header-home-container">
              <FontAwesomeIcon id="header-home" icon={faHouse} />
            </div>
          </NavLink>

          <NavLink
            id="header-add-customer-navlink"
            to={"/add-customer"}
            className={(status) => {
              return status.isActive ? "icon-selected" : "icon";
            }}
          >
            <div className="header-customers-container">
              <FontAwesomeIcon id="header-add-customer" icon={faUserPlus} />
            </div>
          </NavLink>
        </div>
        <div className="header-search">
          <div className="header-search-text-container">Search</div>
          <div className="header-search-bar-container">
            <NavLink id="header-search-results-navlink" to={"/search-results"}>
              <input
                id="searchInput"
                name="searchInput"
                type="text"
                autoComplete="off"
                placeholder="Search customers, engagements and notes"
                value={this.state.searchInput}
                onChange={this.setQueryText}
                onKeyDown={this.checkEnter}
              ></input>
            </NavLink>
          </div>
        </div>
        <div className="header-backup-container">
          <div onClick={this.createBackup} className="header-backup-button">
            Create Backup
          </div>
        </div>
      </div>
    );
  }
}
