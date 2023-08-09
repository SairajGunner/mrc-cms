import { Component } from "react";
import "./App.scss";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import AddCustomer from "./components/add-customer/AddCustomer";
import CustomerPicker from "./components/customer-picker/CustomerPicker";
import Notifications from "./components/notifications/Notifications";
import SearchResults from "./components/search-results/SearchResults";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      selectedCustomer: undefined,
      updateCustomers: false,
      searchQuery: "",
      triggerSearchRender: false
    };
  }

  setCustomers = (customers) => {
    this.setState({
      customers: customers,
      updateCustomers: false
    });
  };

  selectCustomer = (customer) => {
    this.setState({
      selectedCustomer: customer
    });
  };

  updateCustomerList = () => {
    this.setState({
      updateCustomers: true
    });
  };

  setQuery = (query) => {
    this.setState({ searchQuery: query, triggerSearchRender: true }, () => {
      setTimeout(() => {
        this.setState({
          triggerSearchRender: false
        });
      }, 500);
    });
  };

  render() {
    return (
      <div className="app-container">
        <Header setQuery={this.setQuery}></Header>
        <hr></hr>
        <div className="app-content-container">
          <div className="app-customer-picker">
            <CustomerPicker
              setCustomersInApp={this.setCustomers}
              selectCustomer={this.selectCustomer}
              updateCustomerList={this.state.updateCustomers}
            ></CustomerPicker>
          </div>
          <div className="app-main-content">
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      selectedCustomer={
                        this.state.selectedCustomer
                          ? this.state.selectedCustomer
                          : undefined
                      }
                      updateCustomerList={this.updateCustomerList}
                    />
                  }
                ></Route>
                <Route
                  path="/add-customer"
                  element={
                    <AddCustomer updateCustomerList={this.updateCustomerList} />
                  }
                ></Route>
                <Route
                  path="/search-results"
                  element={
                    <SearchResults
                      query={this.state.searchQuery}
                      triggerSearch={this.state.triggerSearchRender}
                      customers={this.state.customers}
                    />
                  }
                ></Route>
              </Routes>
            </main>
          </div>
          <div className="app-notifications-panel">
            <Notifications customers={this.state.customers}></Notifications>
          </div>
        </div>
      </div>
    );
  }
}
