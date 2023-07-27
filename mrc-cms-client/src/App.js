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
  render() {
    return (
      <div className="app-container">
        <Header></Header>
        <hr></hr>
        <div className="app-content-container">
          <div className="app-customer-picker">
            <CustomerPicker></CustomerPicker>
          </div>
          <div className="app-main-content">
            <main>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/add-customer" element={<AddCustomer />}></Route>
                <Route
                  path="/search-results"
                  element={<SearchResults />}
                ></Route>
              </Routes>
            </main>
          </div>
          <div className="app-notifications-panel">
            <Notifications></Notifications>
          </div>
        </div>
      </div>
    );
  }
}
