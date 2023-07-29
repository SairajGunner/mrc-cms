import { Component } from "react";
import "./NoteBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPencil } from "@fortawesome/free-solid-svg-icons";

export default class NoteBox extends Component {
  render() {
    return (
      <div className="note-box-container">
        <div className="note-box-header">
          <div className="note-box-header-title-container">
            {this.props.title}
          </div>
          <div className="note-box-header-edit-container">
            <FontAwesomeIcon
              className="note-box-icon"
              id="note-box-bell-icon"
              icon={faBell}
            />
            <FontAwesomeIcon
              className="note-box-icon"
              id="note-box-pencil-icon"
              icon={faPencil}
            />
            {this.props.date}
          </div>
        </div>
        <div className="note-box-content">
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}
