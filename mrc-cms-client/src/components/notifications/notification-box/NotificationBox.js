import { Component } from "react";
import "./NotificationBox.scss";

export default class NotificationBox extends Component {
  render() {
    return (
      <div className="notification-container">
        <div className="notification-title">{this.props.note.title}</div>
        <div className="notification-content">
          <p>Date: {this.props.note.date}</p>
          <p>Customer: {this.props.customerName}</p>
          <p>
            Completed: <input type="checkbox"></input>
          </p>
        </div>
      </div>
    );
  }
}
