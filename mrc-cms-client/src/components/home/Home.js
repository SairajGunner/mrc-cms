import { Component } from "react";
import "./Home.scss";
import Accordion from "../shared/accordion/Accordion";

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <h2>Customer 2</h2>
        <Accordion title="Details">
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
      </div>
    );
  }
}
