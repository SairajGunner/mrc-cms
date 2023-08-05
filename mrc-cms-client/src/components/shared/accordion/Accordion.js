import React, { useState, useEffect, useRef } from "react";
import "./Accordion.scss";
import Chevron from "./chevron.svg";

export default function Accordion(props) {
  const [toggle, setToggle] = useState(false);
  const [heightEl, setHeightEl] = useState();

  const refHeight = useRef();

  const changeHeightOfDiv = () => {
    if (refHeight.current) {
      setHeightEl(`${refHeight.current.scrollHeight}px`);
    }
  };

  useEffect(() => {
    if (props.openOnLoad) setToggle(true);
  }, [props.openOnLoad]);

  useEffect(() => {
    changeHeightOfDiv();
  }, [props.children]);

  const toggleState = () => {
    setToggle(!toggle);
  };

  return (
    <div className="accordion">
      <button onClick={toggleState} className="accordion-visible">
        <div className="chevron-title">
          <img className={toggle ? "active" : ""} src={Chevron} alt="chevron" />
          <span id="title">
            <b>{props.title}</b>
          </span>
        </div>
      </button>

      <div
        className={toggle ? "accordion-toggle animated" : "accordion-toggle"}
        style={{ height: toggle ? `${heightEl}` : "0px" }}
      >
        <div
          aria-hidden={toggle ? "true" : "false"}
          className="accordion-content"
          ref={refHeight}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
