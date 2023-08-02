import { Component } from "react";
import "./NoteBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPencil } from "@fortawesome/free-solid-svg-icons";

export default class NoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false
    };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.editCompleted !== this.props.editCompleted) {
      if (this.props.editCompleted) {
        this.setState({
          isEditMode: false
        })
      }
    }
  }

  editIconClick = () => {
    this.setState({
      isEditMode: true
    });
    this.props.onEditClick(this.props.note);
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
            {this.props.note.hasReminders.length > 0 &&
              !this.props.note.isCompleted && (
                <FontAwesomeIcon
                  className="note-box-icon"
                  id="note-box-bell-icon"
                  icon={faBell}
                />
              )}
            <FontAwesomeIcon
              className="note-box-icon"
              id="note-box-pencil-icon"
              icon={faPencil}
              onClick={() => this.editIconClick()}
            />
            {this.props.note.date}
          </div>
        </div>
        <div className="note-box-content">
          <p>{this.props.note.content}</p>
        </div>
      </div>
    );
  }
}
