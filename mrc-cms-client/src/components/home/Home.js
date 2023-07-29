import { Component } from "react";
import "./Home.scss";
import Accordion from "../shared/accordion/Accordion";
import NoteBox from "../shared/note-box/NoteBox";

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <h2>Customer 2</h2>
        <Accordion id="accordion-details" title="Details">
          <div className="details-holder">
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>Customer 2</td>
                </tr>
                <tr>
                  <td>Organization:</td>
                  <td>Gamers Paradise</td>
                </tr>
                <tr>
                  <td>Customer Since:</td>
                  <td>June 2020</td>
                </tr>
                <tr>
                  <td>Area of Interest:</td>
                  <td>Level Design</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Accordion>
        <Accordion id="accordion-engagements" title="Previous Engagements">
          
        </Accordion>
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
