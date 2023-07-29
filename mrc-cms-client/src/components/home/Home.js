import { Component } from "react";
import "./Home.scss";
import Accordion from "../shared/accordion/Accordion";
import NoteBox from "../shared/note-box/NoteBox";
import { NotesAPI } from "../../services/notes-service.js";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.selectedCustomer !== this.props.selectedCustomer) {
      this.getNotesbyCustomerId();
    }
  }

  getNotesbyCustomerId = () => {
    if (this.props.selectedCustomer) {
      NotesAPI.getNotesByCustomerId(this.props.selectedCustomer.id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({
            notes: data
          });
        });
    }
  };

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
          {this.state.notes.map((note) => {
            return <NoteBox key={note.id} note={note}></NoteBox>;
          })}

          <div className="home-add-note-button-container">
            <button id="add-note">Add Note</button>
          </div>
        </Accordion>
      </div>
    );
  }
}
