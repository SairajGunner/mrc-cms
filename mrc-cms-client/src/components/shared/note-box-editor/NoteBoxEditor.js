import { Component } from "react";
import "./NoteBoxEditor.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotesAPI } from "../../../services/notes-service.js";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default class NoteBoxEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      oneMonthReminder: false,
      threeMonthReminder: false,
      sixMonthReminder: false,
      oneYearReminder: false,
      content: undefined
    };
  }

  updateTitle = (e) => {
    this.setState({
      title: e.target.value
    });
  };

  updateContent = (e) => {
    this.setState({
      content: e.target.value
    });
  };

  addReminder = (months) => {
    switch (months) {
      case 1:
        this.setState({
          oneMonthReminder: !this.state.oneMonthReminder
        });
        break;
      case 3:
        this.setState({
          threeMonthReminder: !this.state.threeMonthReminder
        });
        break;
      case 6:
        this.setState({
          sixMonthReminder: !this.state.sixMonthReminder
        });
        break;
      case 12:
        this.setState({
          oneYearReminder: !this.state.oneYearReminder
        });
        break;
      default:
        break;
    }
  };

  addNote = () => {
    let reminders = new Array(4);

    if (this.state.oneMonthReminder) reminders[0] = 1;
    if (this.state.threeMonthReminder) reminders[1] = 3;
    if (this.state.sixMonthReminder) reminders[2] = 6;
    if (this.state.oneYearReminder) reminders[3] = 12;

    NotesAPI.addNewNote({
      customerId: this.props.customerId,
      title: this.state.title,
      date: new Date()
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
        .replace(/ /g, "-"),
      content: this.state.content,
      hasReminders: reminders,
      isCompleted: false
    }).then((response) => {
      console.log(response);
      this.props.completedEditing();
      this.setState({
        title: undefined,
        oneMonthReminder: false,
        threeMonthReminder: false,
        sixMonthReminder: false,
        oneYearReminder: false,
        content: undefined
      });
      document
        .getElementById("note-box-edit-header-title")
        .setAttribute("value", undefined);
      document
        .getElementById("note-box-edit-content-textarea")
        .setAttribute("value", undefined);
    });
  };

  render() {
    return (
      <div className="note-box-edit-container">
        <div className="note-box-edit-header">
          <div className="note-box-edit-header-title-container">
            <input
              id="note-box-edit-header-title"
              type="text"
              placeholder="Take a Quick Note Here"
              onChange={this.updateTitle}
            ></input>
          </div>
          <div className="note-box-edit-header-edit-container">
            <FontAwesomeIcon
              className="note-box-edit-icon"
              id="note-box-edit-complete-icon"
              onClick={this.addNote}
              icon={faCheck}
            />
            {new Date()
              .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })
              .replace(/ /g, "-")}
          </div>
        </div>
        <div className="note-box-edit-content">
          <div id="note-box-edit-reminder-selection-container">
            <div id="note-box-edit-reminder-selection-text">Remind me in:</div>
            <div id="note-box-edit-reminder-selection-pills">
              <div
                className={
                  this.state.oneMonthReminder
                    ? "note-box-edit-reminder-pill-selected"
                    : "note-box-edit-reminder-pill"
                }
                onClick={() => this.addReminder(1)}
              >
                1 month
              </div>
              <div
                className={
                  this.state.threeMonthReminder
                    ? "note-box-edit-reminder-pill-selected"
                    : "note-box-edit-reminder-pill"
                }
                onClick={() => this.addReminder(3)}
              >
                3 months
              </div>
              <div
                className={
                  this.state.sixMonthReminder
                    ? "note-box-edit-reminder-pill-selected"
                    : "note-box-edit-reminder-pill"
                }
                onClick={() => this.addReminder(6)}
              >
                6 months
              </div>
              <div
                className={
                  this.state.oneYearReminder
                    ? "note-box-edit-reminder-pill-selected"
                    : "note-box-edit-reminder-pill"
                }
                onClick={() => this.addReminder(12)}
              >
                1 year
              </div>
            </div>
          </div>
          <textarea
            id="note-box-edit-content-textarea"
            rows={4}
            placeholder="The content goes here. Use the tick mark on the header to upload the note."
            onChange={this.updateContent}
          ></textarea>
        </div>
      </div>
    );
  }
}
