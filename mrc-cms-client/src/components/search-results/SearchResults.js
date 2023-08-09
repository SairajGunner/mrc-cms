import { Component } from "react";
import "./SearchResults.scss";
import { SearchAPI } from "../../services/search-service.js";
import Accordion from "../shared/accordion/Accordion";

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customersResult: [],
      engagementsResult: [],
      notesResult: []
    };
  }

  componentDidUpdate(previousProps) {
    if (
      previousProps.triggerSearch !== this.props.triggerSearch &&
      this.props.triggerSearch
    ) {
      SearchAPI.search(this.props.query)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .catch(() => {
          this.setState({
            customersResult: [],
            engagementsResult: [],
            notesResult: []
          });
        })
        .then((data) => {
          if (data) {
            this.setState({
              customersResult: data.customers,
              engagementsResult: data.engagements,
              notesResult: data.notes
            });
          }
        });
    }
  }

  render() {
    return (
      <div id="search-results-container">
        {!this.props.query && <h2>Type your query and press enter</h2>}
        {this.props.query &&
          (this.state.customersResult.length > 0 ||
            this.state.engagementsResult.length > 0 ||
            this.state.notesResult.length > 0) && (
            <h2>Here are your search results</h2>
          )}
        {this.props.query &&
          this.state.customersResult.length === 0 &&
          this.state.engagementsResult.length === 0 &&
          this.state.notesResult.length === 0 && (
            <h2>There were no results for your query</h2>
          )}
        {this.state.customersResult &&
          this.state.customersResult.length > 0 && (
            <div id="customers-results" className="accordion-container">
              <Accordion
                id="customers-accordion"
                title="Customers"
                openOnLoad={true}
              >
                {this.state.customersResult.map((customer) => {
                  return (
                    <div
                      key={customer.id}
                      id={customer.id}
                      className="customer-details"
                    >
                      <div className="customer-details-title">
                        {customer.name} {customer.isProspect && "(Prospect)"}
                      </div>
                      <div className="customer-details-content">
                        <div>Organisation: {customer.organization}</div>
                        <div>Area of Interest: {customer.areaOfInterest}</div>
                      </div>
                      {!customer.isProspect && (
                        <div className="customer-details-subscript">
                          Customer Since {customer.dateOfAssociation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </Accordion>
            </div>
          )}
        {this.state.engagementsResult &&
          this.state.engagementsResult.length > 0 && (
            <div id="engagements-results" className="accordion-container">
              <Accordion
                id="engagements-accordion"
                title="Engagements"
                openOnLoad={true}
              >
                {this.state.engagementsResult.map((engagement) => {
                  return (
                    <div
                      key={engagement.id}
                      id={engagement.id}
                      className="engagement-details"
                    >
                      <div className="engagement-details-title">
                        {engagement.name} {!engagement.endDate && "(On-going)"}
                      </div>
                      {engagement.endDate && (
                        <div className="engagement-details-subscript">
                          This engagement started on {engagement.startDate} and
                          ended on {engagement.endDate}
                        </div>
                      )}
                      {!engagement.endDate && (
                        <div className="engagement-details-subscript">
                          This engagement started on {engagement.startDate}
                        </div>
                      )}
                      <div className="engagement-details-content">
                        <div>Hours per Week: {engagement.hoursOfWork}</div>
                        <div>Area of Work: {engagement.areaOfWork}</div>
                      </div>
                      {engagement.remarks && (
                        <div className="engagement-details-subscript">
                          {engagement.remarks}
                        </div>
                      )}
                    </div>
                  );
                })}
              </Accordion>
            </div>
          )}
        {this.state.notesResult && this.state.notesResult.length > 0 && (
          <div id="notes-results" className="accordion-container">
            <Accordion id="notes-accordion" title="Notes" openOnLoad={true}>
              {this.state.notesResult.map((note) => {
                return (
                  <div key={note.id} id={note.id} className="note-details">
                    <div className="note-details-title">
                      {note.title} {`(${note.date})`}
                    </div>
                    {note.isCompleted && (
                      <div className="note-details-subscript note-complete-text">
                        This note has been addressed.
                      </div>
                    )}
                    {!note.isCompleted && (
                      <div className="note-details-subscript note-not-complete-text">
                        This note has not been addressed.
                      </div>
                    )}
                    {!note.isCompleted && note.hasReminders.length > 0 && (
                      <div className="note-details-subscript">
                        This note has reminders.
                      </div>
                    )}
                    <div className="note-details-content">
                      {note.content}
                    </div>
                  </div>
                );
              })}
            </Accordion>
          </div>
        )}
      </div>
    );
  }
}
