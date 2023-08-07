import { Component } from "react";
import "./CustomerPicker.scss";
import { CustomersAPI } from "../../services/customers-service.js";

export default class CustomerPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      selectedCustomer: undefined
    };
    this.getAllCustomers();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.updateCustomerList !== this.props.updateCustomerList) {
      if (this.props.updateCustomerList) {
        this.getAllCustomers("updating");
      }
    }
  }

  getAllCustomers = (callingCondition) => {
    CustomersAPI.getAllCustomers()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState(
          {
            customers: data
          },
          () => {
            this.props.setCustomersInApp(this.state.customers);
            if (callingCondition === "updating") {
              if (this.state.selectedCustomer) {
                this.selectCustomer(
                  this.state.customers.find(
                    (customer) => customer.id === this.state.selectedCustomer.id
                  )
                );
              }
            }
          }
        );
      });
  };

  selectCustomer = (customer) => {
    this.setState({
      customers: this.state.customers,
      selectedCustomer: customer
    });
    this.props.selectCustomer(customer);
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
              return (
                <div
                  className={
                    this.state.selectedCustomer
                      ? this.state.selectedCustomer.id === customer.id
                        ? "selected-customer"
                        : "customer"
                      : "customer"
                  }
                  onClick={() => this.selectCustomer(customer)}
                  key={customer.id}
                >
                  {customer.name}
                </div>
              );
            }
          })}
        </div>
        <div className="prospective-customer-picker">
          <div>
            <h4>Prospective Customers</h4>
          </div>
          {this.state.customers.map((customer) => {
            if (customer.isProspect) {
              return (
                <div
                  className={
                    this.state.selectedCustomer
                      ? this.state.selectedCustomer.id === customer.id
                        ? "selected-customer"
                        : "customer"
                      : "customer"
                  }
                  onClick={() => this.selectCustomer(customer)}
                  key={customer.id}
                >
                  {customer.name}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
