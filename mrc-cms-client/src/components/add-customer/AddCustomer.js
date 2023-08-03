import { Component } from "react";
import "./AddCustomer.scss";
import Accordion from "../shared/accordion/Accordion";
import NoteBox from "../shared/note-box/NoteBox";
import { CustomersAPI } from "../../services/customers-service.js";
import { NotesAPI } from "../../services/notes-service.js";
import { EngagementsAPI } from "../../services/engagements-service";
import EngagementDisplay from "../shared/engagement-display/EngagementDisplay";
import NoteBoxEditor from "../shared/note-box-editor/NoteBoxEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      customerOrganization: "",
      dateOfAssociation: "",
      areaOfInterest: "",
      customerCreated: false,
      engagements: [],
      selectedEngagement: undefined,
      engagementStartDate: "",
      engagementEndDate: "",
      engagementAreaOfWork: "",
      engagementRemarks: ""
    };
  }

  updateTextBox = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validateDateFormat = (e) => {
    const datePattern =
      /^(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$|^$/;

    if (e.target) {
      datePattern.test(e.target.value)
        ? e.target.classList.remove("field-validation")
        : e.target.classList.add("field-validation");
      return datePattern.test(e.target.value);
    } else {
      return datePattern.test(e.value);
    }
  };

  detailsCompleted = () => {
    if (
      this.validateDateFormat(document.getElementById("text-customer-since"))
    ) {
      CustomersAPI.addNewCustomer({
        name: this.state.customerName,
        organization: this.state.customerOrganization,
        dateOfAssociation: this.state.dateOfAssociation,
        areaOfInterest: this.state.areaOfInterest,
        isProspect: this.state.dateOfAssociation ? false : true
      }).then((response) => {
        if (response.ok) {
          this.setState({
            customerCreated: true
          });
          document.getElementById("details-instructions-text").innerText =
            "Bravo! You may proceed.";
          this.props.updateCustomerList();
        } else {
          document.getElementById("details-instructions-text").innerText =
            "Something went wrong. Please try again.";
        }
      });
    } else {
      document.getElementById("details-instructions-text").innerText =
        "Please enter date in the format DD-MMM-YYYY";
    }
  };

  render() {
    return (
      <div className="home-container">
        <h2>
          {this.props.selectedCustomer
            ? this.props.selectedCustomer.name
            : "Adding a New Customer"}
        </h2>
        <div id="accordion-details-container">
          <Accordion id="accordion-details" title="Details">
            <div className="details-holder">
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>
                      <input
                        id="text-customer-name"
                        className="details-form-input-field"
                        autoComplete="off"
                        name="customerName"
                        type="text"
                        value={this.state.customerName}
                        onChange={this.updateTextBox}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Organisation:</td>
                    <td>
                      <input
                        id="text-customer-org"
                        className="details-form-input-field"
                        autoComplete="off"
                        name="customerOrganization"
                        type="text"
                        value={this.state.customerOrganization}
                        onChange={this.updateTextBox}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Since:</td>
                    <td>
                      <input
                        id="text-customer-since"
                        className={"details-form-input-field"}
                        autoComplete="off"
                        name="dateOfAssociation"
                        placeholder="Empty for prospects"
                        type="text"
                        value={this.state.dateOfAssociation}
                        onChange={this.updateTextBox}
                        onBlur={this.validateDateFormat}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Area of Interest:</td>
                    <td>
                      <input
                        id="text-customer-since"
                        className="details-form-input-field"
                        autoComplete="off"
                        name="areaOfInterest"
                        type="text"
                        value={this.state.areaOfInterest}
                        onChange={this.updateTextBox}
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div id="submit-check-holder">
                <FontAwesomeIcon
                  id="details-completed-icon"
                  className="fa-3x"
                  onClick={this.detailsCompleted}
                  icon={faCheck}
                />
              </div>
            </div>
          </Accordion>
          <p id="details-instructions-text">
            Fill in the details section to proceed.
          </p>
        </div>
        {/* <div id="accordion-engagements-container">
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
              return (
                <NoteBox
                  key={index}
                  onEditClick={this.editNote}
                  editCompleted={!this.state.isEditNote}
                  note={note}
                ></NoteBox>
              );
            })}
            <NoteBoxEditor
              customerId={
                this.props.selectedCustomer
                  ? this.props.selectedCustomer.id
                  : ""
              }
              noteToEdit={this.state.noteBeingEdited}
              completedEditing={this.onEditNoteComplete}
            ></NoteBoxEditor>
          </Accordion>
        </div> */}
      </div>
    );
  }
}
