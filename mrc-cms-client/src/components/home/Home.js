import { Component } from "react";
import "./Home.scss";
import Accordion from "../shared/accordion/Accordion";
import NoteBox from "../shared/note-box/NoteBox";

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <h2>
          {this.props.selectedCustomer
            ? this.props.selectedCustomer.name
            : undefined}
        </h2>
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
        <Accordion
          id="accordion-engagements"
          title="Previous Engagements"
        ></Accordion>
        <Accordion id="accordion-notes" title="Notes">
          <NoteBox
            title="This is a title"
            date="27-Jul-2023"
            content="This is some content"
          ></NoteBox>
          <div className="home-add-note-button-container">
            <button id="add-note">Add Note</button>
          </div>
        </Accordion>
      </div>
    );
  }
}
