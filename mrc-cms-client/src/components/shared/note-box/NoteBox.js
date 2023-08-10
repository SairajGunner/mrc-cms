import { Component } from "react";
import "./NoteBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faPencil,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import { NotesAPI } from "../../../services/notes-service";

export default class NoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      isDeleteInitiated: false
    };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.editCompleted !== this.props.editCompleted) {
      if (this.props.editCompleted) {
        this.setState({
          isEditMode: false
        });
      }
    }
  }

  editIconClick = () => {
    this.setState({
      isEditMode: true
    });
    this.props.onEditClick(this.props.note);
  };

  deleteInitiated = () => {
    this.setState({
      isDeleteInitiated: true
    });
    this.props.noteDeleteStateChange();
  };

  deleteCancelled = () => {
    this.setState({
      isDeleteInitiated: false
    });
    this.props.noteDeleteStateChange();
  };

  deleteNote = () => {
    NotesAPI.deleteNoteById(this.props.note.id).then((response) => {
      if (response.ok) {
        this.setState({
          isDeleteInitiated: false
        });
        this.props.noteDeleted();
      }
    });
  };

  render() {
    return (
      <div
        className={
          this.state.isEditMode
            ? "note-box-container-edit"
            : "note-box-container"
        }
      >
        <div className="note-box-header">
          <div className="note-box-header-title-container">
            {this.props.note.title}
          </div>
          <div className="note-box-header-edit-container">
            {(this.props.note.hasReminders.length > 0 ||
              this.props.note.customReminder) &&
              !this.props.note.isCompleted && (
                <FontAwesomeIcon
                  className="note-box-icon"
                  id="note-box-bell-icon"
                  icon={faBell}
                />
              )}
            {!this.state.isEditMode && !this.state.isDeleteInitiated && (
              <FontAwesomeIcon
                className="note-box-icon"
                id="note-box-pencil-icon"
                icon={faPencil}
                onClick={() => this.editIconClick()}
              />
            )}
            {!this.state.isEditMode && !this.state.isDeleteInitiated && (
              <FontAwesomeIcon
                className="note-box-icon"
                id="note-box-delete-icon"
                icon={faTrashCan}
                onClick={this.deleteInitiated}
              />
            )}
            {this.props.note.date}
          </div>
        </div>
        {this.state.isDeleteInitiated && (
          <div id="note-box-delete-confirmation">
            <div>Are you sure you want to delete this note?</div>
            <div id="note-box-delete-confirmation-buttons">
              <div
                className="note-box-delete-confirmation-button"
                onClick={this.deleteNote}
              >
                Yes
              </div>
              <div
                className="note-box-delete-confirmation-button"
                onClick={this.deleteCancelled}
              >
                No
              </div>
            </div>
          </div>
        )}
        <div className="note-box-content">
          <p>{this.props.note.content}</p>
        </div>
      </div>
    );
  }
}
