import { Component } from "react";
import "./CustomerPicker.scss";

export default class CustomerPicker extends Component {
  render() {
    return (
      <div className="customer-picker-container">
        <div className="existing-customer-picker">
          <div>
            <h4>Customers</h4>
          </div>
          <div>Customer 1</div>
          <div>Customer 2</div>
          <div>Customer 3</div>
          <div>Customer 4</div>
        </div>
        <div className="prospective-customer-picker">
        <div>
            <h4>Prospective Customers</h4>
          </div>
          <div>Customer 5</div>
          <div>Customer 6</div>
          <div>Customer 7</div>
          <div>Customer 8</div>
        </div>
      </div>
    );
  }
}
