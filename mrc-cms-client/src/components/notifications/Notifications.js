import "./Notifications.scss";
import { Component } from "react";
import { NotesAPI } from "../../services/notes-service.js";
import NotificationBox from "./notification-box/NotificationBox";

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneYearNotifications: [],
      sixMonthNotifications: [],
      threeMonthNotifications: [],
      oneMonthNotifications: []
    };
    this.getAllNotes();
  }

  getAllNotes = () => {
    let allActiveNotes = [];
    NotesAPI.getAllNotes()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          allActiveNotes = data.filter(
            (note) => note.hasReminders.length > 0 && !note.isCompleted
          );
          this.setOneYearNotifications(allActiveNotes);
          this.setSixMonthNotifications(allActiveNotes);
          this.setThreeMonthNotifications(allActiveNotes);
          this.setOneMonthNotifications(allActiveNotes);
        }
      });
  };

  setOneYearNotifications = (allActiveNotes) => {
    let requiredNotes = allActiveNotes
      .filter(
        (note) =>
          note.hasReminders.findIndex((reminder) => reminder === 12) > -1
      )
      .filter((note) => this.compareDates(note.date, 12));
    this.setState({
      oneYearNotifications: requiredNotes
    });
  };

  setSixMonthNotifications = (allActiveNotes) => {
    let requiredNotes = allActiveNotes
      .filter(
        (note) => note.hasReminders.findIndex((reminder) => reminder === 6) > -1
      )
      .filter((note) => this.compareDates(note.date, 6));
    this.setState({
      sixMonthNotifications: requiredNotes
    });
  };

  setThreeMonthNotifications = (allActiveNotes) => {
    let requiredNotes = allActiveNotes
      .filter(
        (note) => note.hasReminders.findIndex((reminder) => reminder === 3) > -1
      )
      .filter((note) => this.compareDates(note.date, 3));
    this.setState({
      threeMonthNotifications: requiredNotes
    });
  };

  setOneMonthNotifications = (allActiveNotes) => {
    let requiredNotes = allActiveNotes
      .filter(
        (note) => note.hasReminders.findIndex((reminder) => reminder === 1) > -1
      )
      .filter((note) => this.compareDates(note.date, 1));
    this.setState({
      oneMonthNotifications: requiredNotes
    });
  };

  compareDates = (date, monthsToAdd) => {
    const formattedDate = new Date(date);
    return new Date() >=
      new Date(formattedDate.setMonth(formattedDate.getMonth() + monthsToAdd))
      ? true
      : false;
  };

  render() {
    return (
      <div className="notifications-container">
        <h4 id="notifications-first-header">Notifications</h4>
        {this.state.oneYearNotifications &&
          this.state.oneYearNotifications.length > 0 && (
            <div className="notification-section">
              <h5>One Year Reminders</h5>
              {this.state.oneYearNotifications.map((note) => {
                return (
                  <NotificationBox
                    key={note.id}
                    note={note}
                    customerName={
                      this.props.customers && this.props.customers.length > 0
                        ? this.props.customers.find(
                            (customer) => customer.id === note.customerId
                          ).name
                        : ""
                    }
                  ></NotificationBox>
                );
              })}
            </div>
          )}
        {this.state.sixMonthNotifications &&
          this.state.sixMonthNotifications.length > 0 && (
            <div className="notification-section">
              <h5>Six Month Reminders</h5>
              {this.state.sixMonthNotifications.map((note) => {
                return (
                  <NotificationBox
                    key={note.id}
                    note={note}
                    customerName={
                      this.props.customers && this.props.customers.length > 0
                        ? this.props.customers.find(
                            (customer) => customer.id === note.customerId
                          ).name
                        : ""
                    }
                  ></NotificationBox>
                );
              })}
            </div>
          )}
        {this.state.threeMonthNotifications &&
          this.state.threeMonthNotifications.length > 0 && (
            <div className="notification-section">
              <h5>Three Month Reminders</h5>
              {this.state.threeMonthNotifications.map((note) => {
                return (
                  <NotificationBox
                    key={note.id}
                    note={note}
                    customerName={
                      this.props.customers && this.props.customers.length > 0
                        ? this.props.customers.find(
                            (customer) => customer.id === note.customerId
                          ).name
                        : ""
                    }
                  ></NotificationBox>
                );
              })}
            </div>
          )}
        {this.state.oneMonthNotifications &&
          this.state.oneMonthNotifications.length > 0 && (
            <div className="notification-section">
              <h5>One Month Reminders</h5>
              {this.state.oneMonthNotifications.map((note) => {
                return (
                  <NotificationBox
                    key={note.id}
                    note={note}
                    customerName={
                      this.props.customers && this.props.customers.length > 0
                        ? this.props.customers.find(
                            (customer) => customer.id === note.customerId
                          ).name
                        : ""
                    }
                  ></NotificationBox>
                );
              })}
            </div>
          )}
      </div>
    );
  }
}
