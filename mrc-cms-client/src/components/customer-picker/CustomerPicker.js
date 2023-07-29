import { Component } from "react";
import "./CustomerPicker.scss";
import { CustomersAPI } from "../../services/customers-service.js";

export default class CustomerPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
    this.getAllCustomers();
  }

  getAllCustomers = () => {
    CustomersAPI.getAllCustomers()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          customers: data
        });
      });
  };

  render() {
    return (
      <div className="customer-picker-container">
        <div className="existing-customer-picker">
          <div>
            <h4 id="customer-picker-first-header">Customers</h4>
          </div>
          {this.state.customers.map((customer) => {
            if (!customer.isProspect) {
              return <div key={customer.id}>{customer.name}</div>;
            }
          })}
        </div>
        <div className="prospective-customer-picker">
          <div>
            <h4>Prospective Customers</h4>
          </div>
          {this.state.customers.map((customer) => {
            if (customer.isProspect) {
              return <div key={customer.id}>{customer.name}</div>;
            }
          })}
        </div>
      </div>
    );
  }
}
