import { Component } from "react";
import "./Home.scss";
import Accordion from "../shared/accordion/Accordion";
import NoteBox from "../shared/note-box/NoteBox";
import { CustomersAPI } from "../../services/customers-service.js";
import { NotesAPI } from "../../services/notes-service.js";
import { EngagementsAPI } from "../../services/engagements-service";
import EngagementDisplay from "../shared/engagement-display/EngagementDisplay";
import NoteBoxEditor from "../shared/note-box-editor/NoteBoxEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingDetails: false,
      customerName: "",
      customerOrganization: "",
      customerDateOfAssociation: "",
      customerAreaOfInterest: "",
      notes: [],
      engagements: [],
      selectedEngagement: undefined,
      engagementName: "",
      engagementStartDate: "",
      engagementEndDate: "",
      engagementHoursOfWork: "",
      engagementAreaOfWork: "",
      engagementRemarks: "",
      editingEngagement: false,
      isEditNote: false,
      noteBeingEdited: undefined
    };
    this.getNotesByCustomerId();
    this.getEngagementsByCustomerId();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.selectedCustomer !== this.props.selectedCustomer) {
      this.setState({
        notes: this.state.notes,
        engagements: this.state.engagements,
        selectedEngagement: undefined,
        isEditNote: false,
        noteBeingEdited: undefined
      });
      this.getNotesByCustomerId();
      this.getEngagementsByCustomerId();
    }
    if (previousState.editingEngagement !== this.state.editingEngagement) {
      if (this.state.editingEngagement && this.state.selectedEngagement) {
        this.setState({
          engagementName: this.state.selectedEngagement.name,
          engagementStartDate: this.state.selectedEngagement.startDate,
          engagementEndDate: this.state.selectedEngagement.endDate,
          engagementAreaOfWork: this.state.selectedEngagement.areaOfWork,
          engagementHoursOfWork: this.state.selectedEngagement.hoursOfWork,
          engagementRemarks: this.state.selectedEngagement.remarks
        });
      }
      if (!this.state.editingEngagement) {
        this.setState({
          engagementName: "",
          engagementStartDate: "",
          engagementEndDate: "",
          engagementAreaOfWork: "",
          engagementHoursOfWork: "",
          engagementRemarks: ""
        });
      }
    }
    if (previousState.selectedEngagement !== this.state.selectedEngagement) {
      this.setState({
        engagementName: "",
        engagementStartDate: "",
        engagementEndDate: "",
        engagementAreaOfWork: "",
        engagementHoursOfWork: "",
        engagementRemarks: "",
        editingEngagement: false
      });
    }
  }

  editDetails = () => {
    this.setState({
      editingDetails: true,
      customerName: this.props.selectedCustomer.name,
      customerOrganization: this.props.selectedCustomer.organization,
      customerDateOfAssociation: this.props.selectedCustomer.dateOfAssociation,
      customerAreaOfInterest: this.props.selectedCustomer.areaOfInterest
    });
  };

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

  completedEditingDetails = () => {
    if (
      this.validateDateFormat(document.getElementById("text-customer-since"))
    ) {
      CustomersAPI.updateCustomerById({
        id: this.props.selectedCustomer.id,
        name: this.state.customerName,
        organization: this.state.customerOrganization,
        dateOfAssociation: this.state.customerDateOfAssociation,
        areaOfInterest: this.state.customerAreaOfInterest,
        isProspect: this.state.customerDateOfAssociation ? false : true
      }).then((response) => {
        if (response.ok) {
          this.setState(
            {
              editingDetails: false
            },
            () => {
              this.props.updateCustomerList();
            }
          );
        }
      });
    }
  };

  getNotesByCustomerId = () => {
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

  getEngagementsByCustomerId = () => {
    if (this.props.selectedCustomer) {
      EngagementsAPI.getEngagementsByCustomerId(this.props.selectedCustomer.id)
        .then((respose) => {
          return respose.json();
        })
        .then((data) => {
          this.setState({
            engagements: data
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

  editNote = (note) => {
    this.setState({ isEditNote: true });
    this.setState({ noteBeingEdited: note });
    window.scrollTo(0, document.body.scrollHeight);
  };

  onEditNoteComplete = () => {
    if (this.state.isEditNote) {
      this.setState({ isEditNote: false });
      this.setState({ noteBeingEdited: undefined });
      window.scrollTo(0, 0);
    }
    this.getNotesByCustomerId();
  };

  onEditEngagementComplete = () => {
    if (
      this.validateDateFormat(
        document.getElementById("text-engagement-startDate")
      ) &&
      this.validateDateFormat(
        document.getElementById("text-engagement-endDate")
      )
    ) {
      if (!this.state.editingEngagement) {
        EngagementsAPI.addNewEngagement({
          customerId: this.props.selectedCustomer.id,
          name: this.state.engagementName,
          startDate: this.state.engagementStartDate,
          endDate: this.state.engagementEndDate,
          hoursOfWork: this.state.engagementHoursOfWork,
          areaOfWork: this.state.engagementAreaOfWork,
          remarks: this.state.engagementRemarks
        }).then((response) => {
          if (response.ok) {
            this.setState(
              {
                engagementName: "",
                engagementStartDate: "",
                engagementEndDate: "",
                engagementHoursOfWork: "",
                engagementAreaOfWork: "",
                engagementRemarks: ""
              },
              () => {
                this.getEngagementsByCustomerId();
              }
            );
          }
        });
      } else {
        EngagementsAPI.updateEngagementById({
          id: this.state.selectedEngagement.id,
          customerId: this.props.selectedCustomer.id,
          name: this.state.engagementName,
          startDate: this.state.engagementStartDate,
          endDate: this.state.engagementEndDate,
          hoursOfWork: this.state.engagementHoursOfWork,
          areaOfWork: this.state.engagementAreaOfWork,
          remarks: this.state.engagementRemarks
        }).then((response) => {
          if (response.ok) {
            this.setState(
              {
                selectedEngagement: {
                  id: this.state.selectedEngagement.id,
                  customerId: this.props.selectedCustomer.id,
                  name: this.state.engagementName,
                  startDate: this.state.engagementStartDate,
                  endDate: this.state.engagementEndDate,
                  hoursOfWork: this.state.engagementHoursOfWork,
                  areaOfWork: this.state.engagementAreaOfWork,
                  remarks: this.state.engagementRemarks
                }
              },
              () => {
                this.setState(
                  {
                    engagementName: "",
                    engagementStartDate: "",
                    engagementEndDate: "",
                    engagementHoursOfWork: "",
                    engagementAreaOfWork: "",
                    engagementRemarks: "",
                    editingEngagement: false
                  },
                  () => {
                    this.getEngagementsByCustomerId();
                  }
                );
              }
            );
          }
        });
      }
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
        <div id="accordion-details-container">
          <Accordion id="accordion-details" title="Details">
            <div className="details-holder">
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>
                      {!this.state.editingDetails && this.props.selectedCustomer
                        ? this.props.selectedCustomer.name
                        : undefined}
                      {this.state.editingDetails && (
                        <input
                          id="text-customer-name"
                          className="details-form-input-field"
                          autoComplete="off"
                          name="customerName"
                          type="text"
                          value={this.state.customerName}
                          onChange={this.updateTextBox}
                        ></input>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Organization:</td>
                    <td>
                      {!this.state.editingDetails && this.props.selectedCustomer
                        ? this.props.selectedCustomer.organization
                        : undefined}
                      {this.state.editingDetails && (
                        <input
                          id="text-customer-org"
                          className="details-form-input-field"
                          autoComplete="off"
                          name="customerOrganization"
                          type="text"
                          value={this.state.customerOrganization}
                          onChange={this.updateTextBox}
                        ></input>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Since:</td>
                    <td>
                      {!this.state.editingDetails && this.props.selectedCustomer
                        ? this.props.selectedCustomer.dateOfAssociation
                        : undefined}
                      {this.state.editingDetails && (
                        <input
                          id="text-customer-since"
                          className={"details-form-input-field"}
                          autoComplete="off"
                          name="customerDateOfAssociation"
                          placeholder="Empty for prospects"
                          type="text"
                          value={this.state.customerDateOfAssociation}
                          onChange={this.updateTextBox}
                          onBlur={this.validateDateFormat}
                        ></input>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Area of Interest:</td>
                    <td>
                      {!this.state.editingDetails && this.props.selectedCustomer
                        ? this.props.selectedCustomer.areaOfInterest
                        : undefined}
                      {this.state.editingDetails && (
                        <input
                          id="text-customer-since"
                          className="details-form-input-field"
                          autoComplete="off"
                          name="customerAreaOfInterest"
                          type="text"
                          value={this.state.customerAreaOfInterest}
                          onChange={this.updateTextBox}
                        ></input>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div id="details-options-holder">
                {!this.state.editingDetails && (
                  <FontAwesomeIcon
                    id="details-edit-icon"
                    className="details-action-icon fa-2x"
                    onClick={this.editDetails}
                    icon={faPencil}
                  />
                )}
                {this.state.editingDetails && (
                  <FontAwesomeIcon
                    id="details-completed-icon"
                    className="details-action-icon fa-3x"
                    onClick={this.completedEditingDetails}
                    icon={faCheck}
                  />
                )}
              </div>
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
              <div
                className={
                  this.state.editingEngagement
                    ? "engagement-box-container-editing"
                    : "engagement-box-container"
                }
              >
                <div className="engagement-box-header">
                  <div>
                    {this.state.selectedEngagement &&
                      this.state.selectedEngagement.name}
                  </div>
                  <div>
                    {!this.state.editingEngagement && (
                      <FontAwesomeIcon
                        id="engagement-edit-icon"
                        className="engagement-action-icon"
                        onClick={() =>
                          this.setState({ editingEngagement: true })
                        }
                        icon={faPencil}
                      />
                    )}
                  </div>
                </div>
                <div id="engagement-box-content">
                  <div className="engagement-box-row">
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
                  <div className="engagement-box-row">
                    <div id="engagement-box-content-area-of-work">
                      Area of Work:{" "}
                      {this.state.selectedEngagement &&
                        this.state.selectedEngagement.areaOfWork}
                    </div>
                    <div id="engagement-box-content-hours-per-week">
                      Hours per Week:{" "}
                      {this.state.selectedEngagement &&
                        this.state.selectedEngagement.hoursOfWork}
                    </div>
                  </div>
                  <div id="engagement-box-content-remarks">
                    Remarks:{" "}
                    {this.state.selectedEngagement &&
                      this.state.selectedEngagement.remarks}
                  </div>
                </div>
              </div>
            )}
            <div className="engagement-box-container">
              <div className="engagement-box-header">
                <div id="engagement-edit-box-header-title-container">
                  <input
                    id="text-engagement-name"
                    className="engagement-form-input-field"
                    autoComplete="off"
                    name="engagementName"
                    placeholder="New Engagement Title"
                    type="text"
                    value={this.state.engagementName}
                    onChange={this.updateTextBox}
                  ></input>
                </div>
                <div>
                  <FontAwesomeIcon
                    id="engagement-check-icon"
                    className="engagement-action-icon"
                    onClick={this.onEditEngagementComplete}
                    icon={faCheck}
                  />
                </div>
              </div>
              <div id="engagement-box-content">
                <div className="engagement-box-row">
                  <div id="engagement-box-content-dates-startDate">
                    <input
                      id="text-engagement-startDate"
                      className={"engagement-form-input-field"}
                      autoComplete="off"
                      name="engagementStartDate"
                      placeholder="Start Date"
                      type="text"
                      value={this.state.engagementStartDate}
                      onChange={this.updateTextBox}
                      onBlur={this.validateDateFormat}
                    ></input>
                  </div>
                  <div id="engagement-box-content-dates-endDate">
                    <input
                      id="text-engagement-endDate"
                      className={"engagement-form-input-field"}
                      autoComplete="off"
                      name="engagementEndDate"
                      placeholder="End Date"
                      type="text"
                      value={this.state.engagementEndDate}
                      onChange={this.updateTextBox}
                      onBlur={this.validateDateFormat}
                    ></input>
                  </div>
                </div>
                <div className="engagement-box-row">
                  <div id="engagement-box-content-area-of-work">
                    <input
                      id="text-engagement-area-of-work"
                      className="engagement-form-input-field"
                      autoComplete="off"
                      name="engagementAreaOfWork"
                      placeholder="Area of Work"
                      type="text"
                      value={this.state.engagementAreaOfWork}
                      onChange={this.updateTextBox}
                    ></input>
                  </div>
                  <div id="engagement-box-content-hours-per-week">
                    <input
                      id="text-engagement-hours-per-week"
                      className="engagement-form-input-field"
                      autoComplete="off"
                      name="engagementHoursOfWork"
                      placeholder="Hours Per Week"
                      type="text"
                      value={this.state.engagementHoursOfWork}
                      onChange={this.updateTextBox}
                    ></input>
                  </div>
                </div>
                <div id="engagement-box-content-remarks">
                  <textarea
                    id="textarea-engagement-remarks"
                    className="engagement-form-input-field"
                    name="engagementRemarks"
                    rows={3}
                    placeholder="Remarks regarding the engagement can go here."
                    onChange={this.updateTextBox}
                    value={this.state.engagementRemarks}
                  ></textarea>
                </div>
              </div>
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
        </div>
      </div>
    );
  }
}
