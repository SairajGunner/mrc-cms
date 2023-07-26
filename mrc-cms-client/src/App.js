import { Component } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/header/Header";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <hr></hr>
      </div>
    );
  }
}
