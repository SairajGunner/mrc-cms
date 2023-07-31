import { Component } from "react";
import "./Home.scss";
import Accordion from "../shared/accordion/Accordion";
import NoteBox from "../shared/note-box/NoteBox";
import { NotesAPI } from "../../services/notes-service.js";
import { EngagementsAPI } from "../../services/engagements-service";
import EngagementDisplay from "../shared/engagement-display/EngagementDisplay";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      engagements: [],
      selectedEngagement: undefined
    };
    this.getNotesByCustomerId();
    this.getEngagementsByCustomerId();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.selectedCustomer !== this.props.selectedCustomer) {
      this.setState({
        notes: this.state.notes,
        engagements: this.state.engagements,
        selectedEngagement: undefined
      });
      this.getNotesByCustomerId();
      this.getEngagementsByCustomerId();
    }
  }

  getNotesByCustomerId = () => {
    if (this.props.selectedCustomer) {
      NotesAPI.getNotesByCustomerId(this.props.selectedCustomer.id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({
            notes: data,
            engagements: this.state.engagements,
            selectedEngagement: this.state.selectedEngagement
          });
        });
    }
  };

  getEngagementsByCustomerId = () => {
    if (this.props.selectedCustomer) {
      EngagementsAPI.getEngagementsByCustomerId(this.props.selectedCustomer.id)
        .then((respose) => {
          return respose.json();
        })
        .then((data) => {
          this.setState({
            notes: this.state.notes,
            engagements: data,
            selectedEngagement: this.state.selectedEngagement
          });
        });
    }
  };

  selectEngagement = (engagement) => {
    this.setState({
      notes: this.state.notes,
      engagements: this.state.engagements,
      selectedEngagement: engagement
    });
  };

  render() {
    return (
      <div className="home-container">
        <h2>
          {this.props.selectedCustomer
            ? this.props.selectedCustomer.name
            : undefined}
        </h2>
        <div id="accordion-details-container">
          <Accordion id="accordion-details" title="Details">
            <div className="details-holder">
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>
                      {this.props.selectedCustomer
                        ? this.props.selectedCustomer.name
                        : undefined}
                    </td>
                  </tr>
                  <tr>
                    <td>Organization:</td>
                    <td>
                      {this.props.selectedCustomer
                        ? this.props.selectedCustomer.organization
                        : undefined}
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Since:</td>
                    <td>
                      {this.props.selectedCustomer
                        ? this.props.selectedCustomer.dateOfAssociation
                        : undefined}
                    </td>
                  </tr>
                  <tr>
                    <td>Area of Interest:</td>
                    <td>
                      {this.props.selectedCustomer
                        ? this.props.selectedCustomer.areaOfInterest
                        : undefined}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Accordion>
        </div>
        <div id="accordion-engagements-container">
          <Accordion id="accordion-engagements" title="Previous Engagements">
            {this.state.engagements && this.state.engagements.length > 0 && (
              <EngagementDisplay
                selectEngagement={this.selectEngagement}
                engagements={this.state.engagements}
              ></EngagementDisplay>
            )}
            {this.state.selectedEngagement && (
              <div id="engagement-box-container">
                <div id="engagement-box-header">
                  {this.state.selectedEngagement &&
                    this.state.selectedEngagement.name}
                </div>
                <div id="engagement-box-content">
                  <div id="engagement-box-content-dates">
                    <div id="engagement-box-content-dates-startDate">
                      Start Date:{" "}
                      {this.state.selectedEngagement &&
                        this.state.selectedEngagement.startDate}
                    </div>
                    <div id="engagement-box-content-dates-endDate">
                      End Date:{" "}
                      {this.state.selectedEngagement &&
                        this.state.selectedEngagement.endDate}
                    </div>
                  </div>
                  <div id="engagement-box-content-area-of-work">
                    Area of Work:{" "}
                    {this.state.selectedEngagement &&
                      this.state.selectedEngagement.areaOfWork}
                  </div>
                  <div id="engagement-box-content-remarks">
                    Remarks:{" "}
                    {this.state.selectedEngagement &&
                      this.state.selectedEngagement.remarks}
                  </div>
                </div>
              </div>
            )}
            <div className="home-add-button-container">
              <button className="btn-add">Add Engagement</button>
            </div>
          </Accordion>
        </div>
        <div id="accordion-notes-container">
          <Accordion id="accordion-notes" title="Notes">
            {this.state.notes.map((note, index) => {
              return <NoteBox key={index} note={note}></NoteBox>;
            })}
            <div className="home-add-button-container">
              <button className="btn-add">Add Note</button>
            </div>
          </Accordion>
        </div>
      </div>
    );
  }
}
