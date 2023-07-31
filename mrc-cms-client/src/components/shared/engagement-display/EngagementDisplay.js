import { Component } from "react";
import "./EngagementDisplay.scss";

export default class EngagementDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEngagement: undefined
    };
  }

  weeksBetween = (date1, date2) => {
    return isNaN(
      Math.round(
        (new Date(date2) - new Date(date1)) / (7 * 24 * 60 * 60 * 1000)
      )
    )
      ? "-"
      : Math.round(
          (new Date(date2) - new Date(date1)) / (7 * 24 * 60 * 60 * 1000)
        );
  };

  selectEngagement = (engagement) => {
    this.setState({
      selectedEngagement: engagement
    });
    this.props.selectEngagement(engagement);
  };

  render() {
    return (
      <div id="engagement-display-container">
        <div id="engagement-display-table">
          <table>
            <thead>
              <tr>
                <th>Engagement Name</th>
                <th>Period</th>
                <th>Hours / Week</th>
              </tr>
            </thead>
            <tbody>
              {this.props.engagements.map((engagement) => {
                return (
                  <tr
                    key={engagement.id}
                    style={{
                      color:
                        this.state.selectedEngagement == engagement
                          ? "#143670"
                          : "black"
                    }}
                    className="selected-engagement"
                    onClick={() => this.selectEngagement(engagement)}
                  >
                    <td>{engagement.name}</td>
                    <td>
                      {this.weeksBetween(
                        engagement.startDate,
                        engagement.endDate
                      )}{" "}
                      weeks
                    </td>
                    <td>{engagement.hoursOfWork}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
