import { Component } from "react";
import "./NoteBoxEditor.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotesAPI } from "../../../services/notes-service.js";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default class NoteBoxEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      oneMonthReminder: false,
      threeMonthReminder: false,
      sixMonthReminder: false,
      oneYearReminder: false,
      customReminder: "",
      isCompleted: false,
      content: ""
    };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.noteToEdit !== this.props.noteToEdit) {
      if (this.props.noteToEdit) {
        this.setState({
          title: this.props.noteToEdit.title,
          oneMonthReminder:
            this.props.noteToEdit.hasReminders.findIndex(
              (reminder) => reminder === 1
            ) > -1,
          threeMonthReminder:
            this.props.noteToEdit.hasReminders.findIndex(
              (reminder) => reminder === 3
            ) > -1,
          sixMonthReminder:
            this.props.noteToEdit.hasReminders.findIndex(
              (reminder) => reminder === 6
            ) > -1,
          oneYearReminder:
            this.props.noteToEdit.hasReminders.findIndex(
              (reminder) => reminder === 12
            ) > -1,
          customReminder: this.props.noteToEdit.customReminder,
          isCompleted: this.props.noteToEdit.isCompleted,
          content: this.props.noteToEdit.content
        });
      } else {
        this.setState({
          title: "",
          oneMonthReminder: false,
          threeMonthReminder: false,
          sixMonthReminder: false,
          oneYearReminder: false,
          customReminder: "",
          isCompleted: false,
          content: ""
        });
      }
    }
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

  editCompleted = () => {
    let reminders = new Array(4);

    if (this.state.oneMonthReminder) reminders[0] = 1;
    if (this.state.threeMonthReminder) reminders[1] = 3;
    if (this.state.sixMonthReminder) reminders[2] = 6;
    if (this.state.oneYearReminder) reminders[3] = 12;

    if (
      this.validateDateFormat(
        document.getElementById("note-box-edit-custom-reminder-textbox")
      )
    ) {
      if (this.props.noteToEdit) {
        NotesAPI.updateNoteById({
          id: this.props.noteToEdit.id,
          customerId: this.props.noteToEdit.customerId,
          title: this.state.title,
          date: this.props.noteToEdit.date,
          content: this.state.content,
          hasReminders: reminders,
          customReminder: this.state.customReminder,
          isCompleted: this.state.isCompleted
        }).then(() => {
          this.props.completedEditing();
          this.setState({
            title: "",
            oneMonthReminder: false,
            threeMonthReminder: false,
            sixMonthReminder: false,
            oneYearReminder: false,
            customReminder: "",
            isCompleted: false,
            content: ""
          });
          document
            .getElementById("note-box-edit-header-title")
            .setAttribute("value", "");
          document
            .getElementById("note-box-edit-content-textarea")
            .setAttribute("value", "");
        });
      } else {
        NotesAPI.addNewNote({
          customerId: this.props.customerId,
          title: this.state.title,
          date: new Date().toLocaleDateString("en-CA"),
          content: this.state.content,
          hasReminders: reminders,
          customReminder: this.state.customReminder,
          isCompleted: this.state.isCompleted
        }).then(() => {
          this.props.completedEditing();
          this.setState({
            title: "",
            oneMonthReminder: false,
            threeMonthReminder: false,
            sixMonthReminder: false,
            oneYearReminder: false,
            customReminder: "",
            isCompleted: false,
            content: ""
          });
          document
            .getElementById("note-box-edit-header-title")
            .setAttribute("value", "");
          document
            .getElementById("note-box-edit-content-textarea")
            .setAttribute("value", "");
        });
      }
    }
  };

  updateCustomReminderDate = (e) => {
    this.setState({
      customReminder: e.target.value
    });
  };

  validateDateFormat = (e) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$|^$/;

    if (e.target) {
      datePattern.test(e.target.value)
        ? e.target.classList.remove("field-validation")
        : e.target.classList.add("field-validation");
      return datePattern.test(e.target.value);
    } else {
      return datePattern.test(e.value);
    }
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
              value={this.state.title}
            ></input>
          </div>
          <div className="note-box-edit-header-edit-container">
            <FontAwesomeIcon
              className="note-box-edit-icon"
              id="note-box-edit-complete-icon"
              onClick={this.editCompleted}
              icon={faCheck}
            />
            {(() =>
              this.props.noteToEdit
                ? new Date(this.props.noteToEdit.date)
                : new Date())().toLocaleDateString("en-CA")}
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
          <div className="note-box-edit-custom-reminder-container">
            <div className="note-box-edit-custom-reminder-label">
              Custom Reminder:
            </div>
            <div>
              <input
                id="note-box-edit-custom-reminder-textbox"
                className="note-box-edit-custom-reminder-textbox"
                type="text"
                placeholder="Optional"
                autoComplete="off"
                onChange={this.updateCustomReminderDate}
                onBlur={this.validateDateFormat}
                value={this.state.customReminder}
              ></input>
            </div>
            <div className="note-box-edit-completed-label">Completed:</div>
            <div className="note-box-edit-completed-input">
              <input
                id="note-box-edit-completed-checkbox"
                className="note-box-edit-completed-checkbox"
                type="checkbox"
                checked={this.state.isCompleted}
                onChange={() =>
                  this.setState({
                    isCompleted: !this.state.isCompleted
                  })
                }
              ></input>
            </div>
          </div>
          <textarea
            id="note-box-edit-content-textarea"
            rows={4}
            placeholder="The content goes here. Use the tick mark on the header to upload the note."
            onChange={this.updateContent}
            value={this.state.content}
          ></textarea>
        </div>
      </div>
    );
  }
}
